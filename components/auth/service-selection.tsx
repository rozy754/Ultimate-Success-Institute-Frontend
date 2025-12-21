"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Monitor, Users, ArrowRight } from "lucide-react"
import { api } from "@/lib/api"

type User = {
  name: string
  email: string
  role?: "admin" | "student"
}

type Service = {
  icon: any
  title: string
  slug: string
  description: string
  features: string[]
}

export function ServiceSelection() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const ls = localStorage.getItem("user")
        if (ls) setUser(JSON.parse(ls))

        const resp = await api.get<{ data: { user: User } }>("/auth/me")
        if (resp.data?.user) {
          setUser(resp.data.user)
          localStorage.setItem("user", JSON.stringify(resp.data.user))
        }
      } catch {
        console.log("User not logged in")
      }
    }

    loadUser()
  }, [])

  const services: Service[] = [
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

  const handleServiceClick = (service: Service) => {
    if (!user) {
      router.push("/login")
      return
    }

    if (service.slug === "library") {
      router.push(user.role === "admin" ? "/admin" : "/library")
    } else {
      router.push(`/${service.slug}`)
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
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-primary/20"
              onClick={() => handleServiceClick(service)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    Available
                  </Badge>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-left text-sm">
                      <div className="w-2 h-2 rounded-full mr-3 mt-1.5 bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleServiceClick(service)
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-card/50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-4">
              Choose any service and begin your growth with expert guidance.
            </p>
            <Button
              size="lg"
              className="px-8"
              onClick={() =>
                handleServiceClick(services[0]) // Library default
              }
            >
              Start with Library
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
