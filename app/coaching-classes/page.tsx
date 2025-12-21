import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Trophy, ArrowRight, BookOpen } from "lucide-react"

export default function CoachingClassesPage() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      {/* Hero */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Result-Oriented Coaching</Badge>
        <h1 className="text-4xl font-bold mb-4">
          Ultimate Success Coaching Institute
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Ultimate Success Coaching Institute provides focused and
          result-oriented coaching for various competitive examinations of
          Uttarakhand and India. Our classes are designed to build strong
          fundamentals, conceptual clarity, and exam-oriented preparation under
          experienced faculty.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Users className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Experienced Faculty</h3>
            <p className="text-sm text-muted-foreground">
              Dedicated and knowledgeable teachers for every subject
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Target className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Exam-Oriented Teaching</h3>
            <p className="text-sm text-muted-foreground">
              Structured preparation focused on exam patterns & syllabus
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Supportive Environment</h3>
            <p className="text-sm text-muted-foreground">
              Regular practice & doubt-clearing sessions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses, Timings & Faculty */}
      <Card className="mb-12">
        <CardContent className="pt-6 space-y-8">
          {/* Courses */}
          <div>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Courses Offered
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Uttarakhand Group C</li>
              <li>VDO / VPDO</li>
              <li>Patwari / Lekhpal</li>
              <li>Police Constable / Sub-Inspector (SI)</li>
              <li>RO / ARO</li>
              <li>Other competitive examinations</li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Class Timings</h3>
            <p className="text-muted-foreground">
              Morning Batch: 9:00 AM – 12:30 PM
            </p>
            <p className="text-muted-foreground">
              Evening Batch: 3:00 PM – 6:00 PM
            </p>
          </div>

          {/* Faculty */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Faculty</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <strong>General Studies (GS):</strong> Yashveer Sir
              </li>
              <li>
                <strong>Uttarakhand / Hindi:</strong> Rahul Gusain Sir
              </li>
              <li>
                <strong>Reasoning / Mathematics:</strong> Himanshu Gusain Sir
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Badge className="mb-4">📢 New batches starting soon</Badge>
        <p className="text-muted-foreground mb-6">
          📝 Registration open now
        </p>
        <Button size="lg" className="px-10">
          Join Coaching Classes
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
