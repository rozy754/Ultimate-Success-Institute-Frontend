"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Monitor, Users, ArrowRight, Lock } from "lucide-react"
import { api } from "@/lib/api"

type User = { name: string; email: string; role?: "admin" | "student" }

export function ServiceSelection() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const ls = localStorage.getItem("user")
        if (ls) {
          const parsedUser = JSON.parse(ls)
          setUser(parsedUser)
        }

        const resp = await api.get<{ success: boolean; data: { user: User } }>("/auth/me")
        if (resp.data.user) {
          setUser(resp.data.user)
          localStorage.setItem("user", JSON.stringify(resp.data.user))
        }
      } catch (error) {
        console.log("API error, using localStorage")
      }
    }

    loadUser()
  }, [])

  const services = [
    {
      icon: BookOpen,
      title: "Library Services",
      description:
        "A peaceful & disciplined study environment with 100+ books and complete study resources.",
      features: ["100+ Books", " Silent & A/C Study Rooms", " Goal-Setting Support", " Locker • Wi-Fi • Charging Points"],
      status: "active",

    },
    {
      icon: Monitor,
      title: "Computer Classes",
      description:
        "Professional & practical-based computer courses designed to make you skilled and job-ready.",
      features: ["Basic to Advanced Computer Courses", " MS Office, Typing, DTP, Tally Prime", " Hands-on Lab Training", "Certification with Practical Learning"],
      status: "coming-soon",
      bgColor: "bg-muted/50",
      iconColor: "text-muted-foreground",
    },
    {
      icon: Users,
      title: "Coaching Classes",
      description: "Result-oriented preparation with concept clarity, practice, test series & mentoring.",
      features: ["Uttarakhand Government Exams :-", "UKSSSC, UKPSC, UK Group C , VDO/VPDO, Patwari/Lekhpal, Police Constable/SI, Lower PCS, RO/ARO, UK PCS", " All India Exams :- ",
"SSC • Banking • Railway • Defence • All One-Day Exams"],
      status: "coming-soon",
      bgColor: "bg-muted/50",
      iconColor: "text-muted-foreground",
    },
  ]

  const handleLibraryClick = () => {
    if (!user) {
      router.push("/login")
      return
    }

    // Role-based redirect: Admin -> /admin, Student -> /library
    if (user.role === "admin") {
      router.push("/admin")
    } else {
      router.push("/library")
    }
  }

  const handleServiceClick = (service: (typeof services)[0]) => {
    if (service.status === "active" && service.title === "Library Services") {
      handleLibraryClick()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 ${
                service.status === "active"
                  ? "hover:shadow-lg hover:scale-105 cursor-pointer border-primary/20"
                  : "opacity-75"
              } ${service.bgColor}`}
              onClick={() => handleServiceClick(service)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-full ${service.status === "active" ? "bg-primary/10" : "bg-muted"}`}>
                    <Icon className={`h-8 w-8 ${service.iconColor}`} />
                  </div>
                  {service.status === "coming-soon" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Coming Soon
                    </Badge>
                  )}
                  {service.status === "active" && (
                    <Badge className="bg-primary text-primary-foreground">Available</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-left text-sm">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 ${service.status === "active" ? "bg-primary" : "bg-muted-foreground"}`}
                      />
                      <span className={service.status === "active" ? "text-foreground" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={service.status === "active" ? "default" : "outline"}
                  disabled={service.status === "coming-soon"}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleServiceClick(service)
                  }}
                >
                  {service.status === "active" ? (
                    <>
                      Access Library
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Coming Soon
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-card/50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-4">
              Begin with our Library services and unlock your potential. More services will be available soon!
            </p>
            <Button onClick={handleLibraryClick} size="lg" className="px-8">
              Start with Library
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
