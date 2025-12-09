import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Users, User, Quote } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Ultimate Success Institute</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ultimate Success Institute & Library is a trusted learning destination for students and professionals who dream big and work hard to achieve success.
            With our fully-equipped library, expert coaching programs, and industry-oriented computer courses, we help you grow academically, skill-wise, and personally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: Mission & Founder's Message grouped in one div */}
          <div className="space-y-10">

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
          </div>

          {/* RIGHT COLUMN: Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Goal-Oriented</h4>
                <p className="text-sm text-muted-foreground">Focused approach to achieve your objectives</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Supportive</h4>
                <p className="text-sm text-muted-foreground">Caring environment for all learners</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Mission</h4>
                <p className="text-sm text-muted-foreground">Empowering success through discipline and education.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Community</h4>
                <p className="text-sm text-muted-foreground">Strong network of learners and mentors</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}