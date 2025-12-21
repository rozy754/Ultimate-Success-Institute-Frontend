"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Monitor, Users, ArrowRight } from "lucide-react"

type User = {
  name: string
  email: string
  role?: "admin" | "student"
}

export function ServicesSection() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const ls = localStorage.getItem("user")
        if (ls) {
          setUser(JSON.parse(ls))
        }

        const resp = await api.get<{ data: { user: User } }>("/auth/me")
        if (resp.data?.user) {
          setUser(resp.data.user)
          localStorage.setItem("user", JSON.stringify(resp.data.user))
        }
      } catch (err) {
        console.log("User not logged in, using guest mode")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const services = [
    {
      icon: BookOpen,
      title: "Library Services",
      slug: "library",
      description:
        "A peaceful & disciplined study environment with 100+ books and complete study resources.",
      features: [
        "100+ Books",
        "Silent & A/C Study Rooms",
        "Goal-Setting Support",
        "Locker • Wi-Fi • Charging Points",
      ],
    },
    {
      icon: Monitor,
      title: "Computer Classes",
      slug: "computer-classes",
      description:
        "Professional & practical-based computer courses designed to make you skilled and job-ready.",
      features: [
        "Basic to Advanced Computer Courses",
        "MS Office, Typing, DTP, Tally Prime",
        "Hands-on Lab Training",
        "Certification with Practical Learning",
      ],
    },
    {
      icon: Users,
      title: "Coaching Classes",
      slug: "coaching-classes",
      description:
        "Result-oriented preparation with concept clarity, practice, test series & mentoring.",
      features: [
        "UKSSSC, UKPSC, VDO/VPDO, Patwari/Lekhpal",
        "Police Constable / SI / RO / ARO",
        "SSC • Banking • Railway • Defence",
      ],
    },
  ]

  const handleServiceClick = (slug: string) => {
    if (!user) {
      router.push("/login")
      return
    }

    if (slug === "library") {
      router.push(user.role === "admin" ? "/admin" : "/library")
    } else {
      router.push(`/${slug}`)
    }
  }

  return (
    <section id="services" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering every student with the right resources, skills and
            guidance to achieve academic and career success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <Card
                key={index}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-primary/20"
              >
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    onClick={() => handleServiceClick(service.slug)}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
