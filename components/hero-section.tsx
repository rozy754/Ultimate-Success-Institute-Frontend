"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type User = { name: string; email: string; role?: string }

const SLIDES = [
  { url: '/special.jpeg', alt: 'Computer Lab' },
  { url: '/glass.png', alt: 'Coaching Center' },
  { url: '/shelf.png', alt: 'Premium Library' },
   { url: '/lab.jpeg', alt: 'Computer Lab' },
  { url: '/coaching.jpeg', alt: 'Coaching' },
 
]

export function HeroSection() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const resp = await api.get<{ success: boolean; data: { user: User } }>("/auth/me")
        if (!cancelled) setUser(resp.data.user)
      } catch {
        if (!cancelled) {
          try {
            const ls = localStorage.getItem("user")
            if (ls) setUser(JSON.parse(ls))
          } catch {}
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const handleGetStarted = () => {
    if (user) {
      const el = document.getElementById("services")
      el ? el.scrollIntoView({ behavior: "smooth", block: "start" }) : router.push("/#services")
    } else {
      router.push("/signup")
    }
  }

  return (
    <section id="home" className="group relative py-12 md:py-20 lg:py-32 overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
      
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
              <img 
                src={slide.url} 
                alt={slide.alt} 
                className="w-full h-full object-cover object-center opacity-90" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manual Control Arrows - Fixed for Mobile */}
      {/* md:opacity-0 group-hover:opacity-100 means they hide on desktop until hover, but stay visible on mobile */}
      <button 
        onClick={scrollPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-background/40 hover:bg-background/60 text-foreground transition-opacity md:opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      
      <button 
        onClick={scrollNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 md:p-2 rounded-full bg-background/40 hover:bg-background/60 text-foreground transition-opacity md:opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Overlay */}
      <div className="absolute  inset-0 bg-background/40 md:bg-background/40 dark:bg-background/80 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground mb-4 md:mb-6">
            Ultimate Success Institute
          </h1>
          <p className="text-lg md:text-2xl font-sans font-medium text-primary mb-6 md:mb-8 max-w-3xl mx-auto">
            One Destination for Learning, Discipline & Growth
          </p>
          <p className="text-base md:text-lg  mb-8 md:mb-12 max-w-2xl mx-auto font-medium text-black">
            Unlock your full potential with our premium library, professional computer courses, and result-oriented coaching programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
            <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto" onClick={handleGetStarted} disabled={loading}>
              {user ? "Explore Services" : "Get Started Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-linear-to-bl border-2 w-full sm:w-auto">
              <a href="/gallery">View Gallery</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <StatItem icon={<BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />} title="Peaceful Library" color="primary" />
            <StatItem icon={<Users className="h-6 w-6 md:h-8 md:w-8 text-secondary" />} title="Exam Coaching" color="secondary" />
            <StatItem icon={<Trophy className="h-6 w-6 md:h-8 md:w-8 text-accent" />} title="Certified Courses" color="accent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ icon, title, color = "primary" }: { icon: React.ReactNode, title: string, color?: "primary" | "secondary" | "accent" }) {
  const colorMap = {
    primary: "bg-primary/10 dark:bg-primary/20",
    secondary: "bg-secondary/10 dark:bg-secondary/20",
    accent: "bg-accent/10 dark:bg-accent/20",
  }
  return (
    <div className="flex flex-col items-center">
      <div className={`${colorMap[color as keyof typeof colorMap]} p-3 md:p-4 rounded-full mb-3 md:mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg md:text-2xl font-sans font-bold text-foreground">{title}</h3>
    </div>
  )
}