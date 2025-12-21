"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Quote,
  User,
  Info 
} from "lucide-react"
import Link from "next/link"
import { RenewalReminderPopup } from "@/components/library/renewal-reminder-popup"
import { subscriptionApi, Subscription } from "@/lib/subscription-api"
import { PRICING, Duration } from "@/lib/pricing"

interface UserStats {
  currentStreak: number
  totalDays: number
  completedGoals: number
  totalGoals: number
  subscriptionStatus: string
  subscriptionExpiry: string | null
  subscriptionType: string | null
  daysRemaining: number
}

function formatDate(d?: string | null) {
  if (!d) return "N/A"
  try {
    return new Date(d).toDateString()
  } catch {
    return String(d)
  }
}

function calcTotalDays(start?: string, end?: string) {
  if (!start || !end) return 30
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  if (Number.isNaN(s) || Number.isNaN(e) || e <= s) return 30
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24))
}

function simplePlanLabel(sub: Subscription | null): string | null {
  if (!sub) return null
  const duration = sub.duration ?? (sub.plan?.match(/^\s*\d+\s*Month[s]?/i)?.[0] ?? "").trim()
  return duration ? `${duration} Subscription` : sub.plan ?? null
}

function minPriceForDuration(d: Duration): number {
  const shifts = Object.values(PRICING[d])
  const all = shifts.flatMap((m) => Object.values(m))
  return Math.min(...all)
}

export function LibraryDashboard() {
  const [user, setUser] = useState<any>(null)
  const [showRenewalReminder, setShowRenewalReminder] = useState(false)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Ref to always read latest stats inside interval callback
  const statsRef = useRef<UserStats | null>(null)
  useEffect(() => {
    statsRef.current = stats
  }, [stats])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const fetchDashboardData = async () => {
      try {
        const subRes = await subscriptionApi.getCurrentSubscription()
        const sub: Subscription | null = subRes.data ?? null

        setStats({
          currentStreak: 0,
          totalDays: 0,
          completedGoals: 0,
          totalGoals: 0,
          subscriptionStatus: sub?.status ?? "Inactive",
          subscriptionExpiry: sub?.expiryDate ?? null,
          subscriptionType: simplePlanLabel(sub),
          daysRemaining: sub?.daysRemaining ?? 0,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setStats({
          currentStreak: 0,
          totalDays: 0,
          completedGoals: 0,
          totalGoals: 0,
          subscriptionStatus: "Inactive",
          subscriptionExpiry: null,
          subscriptionType: null,
          daysRemaining: 0,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  useEffect(() => {
    const checkAndShow = () => {
      const s = statsRef.current
      const userData = localStorage.getItem("user")
      const localUser = userData ? JSON.parse(userData) : null

      if (
        localUser?.role === "student" &&
        s?.subscriptionStatus === "Active" &&
        typeof s.daysRemaining === "number" &&
        s.daysRemaining <= 7
      ) {
        setShowRenewalReminder(true)
      }
    }

    checkAndShow()
    const intervalId = setInterval(checkAndShow, 8 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const durationCards = [
    { name: "1 Month", fromPrice: minPriceForDuration("1 Month") },
    { name: "3 Months", fromPrice: minPriceForDuration("3 Months") },
    { name: "7 Months", fromPrice: minPriceForDuration("7 Months") },
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse text-center">
             <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Welcome back, {user?.name || "Student"}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Premium study environment designed for serious learners and competitive exam aspirants.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">{stats?.currentStreak || 0} days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Study Days</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalDays || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Goals Progress</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.completedGoals || 0}/{stats?.totalGoals || 0}
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subscription</p>
                <Badge
                  variant={stats?.subscriptionStatus === "Active" ? "default" : "outline"}
                  className="mt-1"
                >
                  {stats?.subscriptionStatus || "Inactive"}
                </Badge>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Subscription Status */}
      {stats?.subscriptionStatus === "Active" && stats.subscriptionExpiry ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {stats.subscriptionType || "Subscription"} - Active
                </h3>
                <p className="text-muted-foreground">
                  Expires on {formatDate(stats.subscriptionExpiry)}
                </p>
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">Days remaining</span>
                    <Badge variant="outline">{stats.daysRemaining} days</Badge>
                  </div>
                  <Progress
                    value={(() => {
                      const total = calcTotalDays(undefined, stats.subscriptionExpiry || undefined)
                      const remaining = stats.daysRemaining || 0
                      const done = Math.max(0, total - remaining)
                      return Math.min(100, Math.round((done / total) * 100))
                    })()}
                    className="w-full md:w-64"
                  />
                </div>
              </div>
              <Button asChild>
                <Link href="/library/subscription">Manage Subscription</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              No Active Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground">
                  Choose a plan to get started
                  OR Available on Call / WhatsApp +91 9759951721
                </p>
              </div>
              <Button asChild>
                <Link href="/library/subscription">Choose Plan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Subscription Plans (Cards) */}
      <Card>
        <CardHeader>
          <CardTitle>Available Subscription Plans</CardTitle>
          <p className="text-muted-foreground">Pick a duration, then choose shift & seat on the next page</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {durationCards.map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-lg border hover:shadow transition border-border`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground">₹{plan.fromPrice}</span>
                    <span className="text-muted-foreground">/from</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>Choose shift & seat at checkout</li>
                 <li>One-time Registration (₹150) & Optional Locker (₹100)</li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/library/subscription">Choose Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* NEW SECTION: DETAILED FEE STRUCTURE & SEAT TYPES */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-8">
        <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Info className="h-5 w-5 text-primary" />
               Detailed Fee Structure & Seat Types
             </CardTitle>
           </CardHeader>
           <CardContent className="space-y-8">
             
             {/* 1. Monthly Plans */}
             <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>🔥</span> Monthly Plans
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3">Seat Type</th>
                        <th className="p-3">Full Day</th>
                        <th className="p-3">Morning</th>
                        <th className="p-3">Evening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-medium">Regular Seat</td>
                        <td className="p-3">₹850 / month</td>
                        <td className="p-3">₹650</td>
                        <td className="p-3">₹550</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Special Seat (Premium)</td>
                        <td className="p-3">₹950 / month</td>
                        <td className="p-3">₹700</td>
                        <td className="p-3">₹600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>

             {/* 2. 3-Month Subscription */}
             <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>💥</span> 3-Month Subscription Plans
                    <Badge variant="secondary" className="text-xs">Save More</Badge>
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3">Seat Type</th>
                        <th className="p-3">Full Day</th>
                        <th className="p-3">Morning</th>
                        <th className="p-3">Evening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-medium">Regular Seat</td>
                        <td className="p-3">₹2400</td>
                        <td className="p-3">₹1800</td>
                        <td className="p-3">₹1500</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Special Seat (Premium)</td>
                        <td className="p-3">₹2700</td>
                        <td className="p-3">₹2000</td>
                        <td className="p-3">₹1700</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>

             {/* 3. 6-Month Premium Offer */}
             <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span>🎁</span> 7-Month Premium Offer
                    </h3>
                    <Badge className="bg-green-600 hover:bg-green-700">1 Month FREE</Badge>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 p-3 rounded-md mb-3 text-sm flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                    <span className="font-medium text-primary">Pay for 6 months — get 1 month subscription</span>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3">Seat Type</th>
                        <th className="p-3">Full Day</th>
                        <th className="p-3">Morning</th>
                        <th className="p-3">Evening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-medium">Regular Seat</td>
                        <td className="p-3">₹5100</td>
                        <td className="p-3">₹3900</td>
                        <td className="p-3">₹3300</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Special Seat (Premium)</td>
                        <td className="p-3">₹5700</td>
                        <td className="p-3">₹4200</td>
                        <td className="p-3">₹3600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>

             {/* 4. Seat Differences */}
             <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>🪑</span> Difference between Seat Types
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                      <tr>
                        <th className="p-3 w-1/3">Seat Type</th>
                        <th className="p-3">Features</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-medium">Regular Seat</td>
                        <td className="p-3 text-muted-foreground">Comfortable & peaceful study space with all basic facilities</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Special Seat (Premium)</td>
                        <td className="p-3 text-muted-foreground">More spacious seating + priority area</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>

           </CardContent>
        </Card>
      </div>

      {/* ────────────────────────────── */}
      {/* FOUNDER MESSAGE & CONTACT (Existing) */}
      {/* ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Founder's Message Card */}
        <Card className="bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-primary" />
              Founder’s Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">Himanshu Gusain</h3>
              <p className="text-sm text-muted-foreground">Founder, Ultimate Success Coaching Institute & Library</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Welcome to Ultimate Success Coaching Institute & Library.
              Our mission is to empower students through education, discipline, and consistency.
              We believe success is not luck — it is built by daily efforts, routine, and strong mindset.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 py-1 my-4 italic text-foreground/90 bg-background/50 rounded-r">
              <div className="flex gap-2">
                <Quote className="h-4 w-4 text-primary/50 transform rotate-180 mb-auto" />
                <p>At Ultimate Success, we don’t just provide study space or classes — we build disciplined winners.</p>
              </div>
            </blockquote>

            <div className="pt-2 font-medium text-primary">
              Thank you for trusting us. Let’s build your success together.
            </div>
          </CardContent>
        </Card>

        {/* Contact Us Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Phone className="h-5 w-5 text-primary" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Location */}
            <div className="flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Location</h4>
                <p className="text-muted-foreground text-sm">Shimla Bypass Road, Dehradun, Uttarakhand</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3 items-start">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Call / WhatsApp</h4>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <a href="tel:9759951721" className="hover:text-primary transition-colors">9759951721</a>
                  <a href="tel:9149358561" className="hover:text-primary transition-colors">9149358561</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3 items-start">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Email</h4>
                <a href="mailto:ultimatesucces721@gmail.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  ultimatesucces721@gmail.com
                </a>
              </div>
            </div>

            {/* Website */}
            <div className="flex gap-3 items-start">
              <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Website</h4>
                <a
                  href="https://ultimate-success-institute-and-library.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors break-all"
                >
                  ultimate-success-institute-and-library.vercel.app
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="flex gap-3 items-start border-t pt-4">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Institute Timings</h4>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Full Day:</span> 6:00 AM – 10:00 PM</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Morning:</span> 6:00 AM – 2:00 PM</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Evening:</span> 2:00 AM – 10:00 PM</p>              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Footer Section */}
      <footer className="text-center text-sm text-muted-foreground pt-8 pb-4 border-t mt-8">
        <p>© 2025 Ultimate Success Coaching Institute & Library</p>
        <p className="mt-1">Empowering Education • Building Future • Inspiring Success</p>
      </footer>

      {/* Renewal Reminder Popup */}
      <RenewalReminderPopup
        isOpen={showRenewalReminder}
        onClose={() => setShowRenewalReminder(false)}
        daysRemaining={stats?.daysRemaining ?? 0}
        plan={stats?.subscriptionType ?? "Unknown Plan"}
      />
    </div>
  )
}