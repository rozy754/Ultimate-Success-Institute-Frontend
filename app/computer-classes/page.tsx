import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Award, Clock, ArrowRight, BookOpen } from "lucide-react"

export default function ComputerClassesPage() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      {/* Hero */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Skill • Certification • Career</Badge>
        <h1 className="text-4xl font-bold mb-4">
          Ultimate Success Computer Training Center
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Ultimate Success Computer Training Center offers practical,
          job-oriented computer courses designed to build strong digital skills
          for students, job seekers, and working professionals.
        </p>
      </div>

      {/* Why Choose */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Monitor className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Practical-Based Training</h3>
            <p className="text-sm text-muted-foreground">
              Hands-on learning with real computer lab practice
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Award className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Experienced Instructors</h3>
            <p className="text-sm text-muted-foreground">
              Learn from skilled and supportive trainers
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
          <CardContent className="pt-6 text-center">
            <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Flexible Timings</h3>
            <p className="text-sm text-muted-foreground">
              Morning & evening batches for all learners
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses & Timings */}
      <Card className="mb-12">
        <CardContent className="pt-6 space-y-8">
          {/* Courses */}
          <div>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Courses Offered
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>DCA (Diploma in Computer Applications)</li>
              <li>ADCA (Advanced Diploma in Computer Applications)</li>
              <li>Data Entry</li>
              <li>Typing (Hindi & English)</li>
              <li>Tally</li>
              <li>Basic & Advanced Computer Courses</li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Class Timings</h3>
            <p className="text-muted-foreground">
              Morning Batch: 9:00 AM – 12:00 PM
            </p>
            <p className="text-muted-foreground">
              Evening Batch: 3:00 PM – 6:00 PM
            </p>
          </div>

          {/* Why Choose */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Why Choose Our Computer Courses?
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Practical-based training</li>
              <li>Experienced instructors</li>
              <li>Career & job-oriented syllabus</li>
              <li>Certification after course completion</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Badge className="mb-4">📢 New batches starting soon</Badge>
        <p className="text-muted-foreground mb-6">
          📝 Admissions open
        </p>
        <Button size="lg" className="px-10">
          Enroll in Computer Courses
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
