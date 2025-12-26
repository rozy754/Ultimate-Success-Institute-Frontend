"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Users, Loader2, Trash2 } from "lucide-react"
import { adminApi } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  status: string
  endDate: string | null
  daysRemaining: number
}

export function WhatsAppReminders() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null) // ✅ Delete loading state
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const [expiredRes, expiringRes] = await Promise.all([
          adminApi.getUsers({ status: "expired" }),
          adminApi.getUsers({ status: "expiring" }),
        ])
        const users = [...(expiredRes.data.users || []), ...(expiringRes.data.users || [])]
        setStudents(users)
        setError(null)
      } catch (err: any) {
        setError("Failed to load reminders.")
        toast({
          title: "Error fetching users",
          description: "Could not load expired or expiring users.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [toast])

  // ✅ Handle User Deletion
  const handleDeleteUser = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${studentName}? This will remove all their payment and subscription records.`)) {
      return
    }

    try {
      setIsDeleting(studentId)
      await adminApi.deleteUser(studentId)
      
      // UI se turant remove karein
      setStudents(prev => prev.filter(s => s.id !== studentId))
      
      toast({
        title: "User Removed",
        description: `${studentName} has been deleted from the system.`,
      })
    } catch (err) {
      toast({
        title: "Delete Failed",
        description: "Could not remove user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const generateWhatsAppMessage = (student: Student) => {
    const expiryText =
      student.status === "expired"
        ? "has expired 😕"
        : student.daysRemaining === 0
        ? "is expiring today ⏰"
        : `is expiring in ${student.daysRemaining} day${student.daysRemaining > 1 ? "s" : ""} ⏰`

    const message = `Hi ${student.name}! 👋\n\nYour ${student.plan} subscription at Ultimate Success Institute ${expiryText}.\n\nRenew today and keep fueling your success! 🚀`
    return encodeURIComponent(message)
  }

  const sendWhatsAppMessage = (student: Student) => {
    const message = generateWhatsAppMessage(student)
    window.open(`https://wa.me/91${student.phone}?text=${message}`, "_blank")
  }

  const sendBulkReminders = () => {
    if (students.length === 0) return
    if (!confirm(`Send ${students.length} reminders?`)) return
    students.forEach((student, index) => {
      setTimeout(() => sendWhatsAppMessage(student), index * 600)
    })
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">WhatsApp Reminders</h2>
          <p className="text-muted-foreground text-sm">Manage expired and expiring subscriptions</p>
        </div>
        <Button onClick={sendBulkReminders} className="bg-green-600 hover:bg-green-700">
          <Send className="mr-2 h-4 w-4" /> Send All
        </Button>
      </div>

      <div className="grid gap-4">
        {students.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">🎉 No reminders needed!</p>
        ) : (
          students.map((student) => (
            <Card key={student.id} className="border-l-4 border-l-rose-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <CardDescription>+91 {student.phone}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={student.status === "expired" ? "destructive" : "secondary"}>
                      {student.status === "expired" ? "Expired" : `${student.daysRemaining} days left`}
                    </Badge>
                    <Badge variant="outline">{student.plan}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expires: {student.endDate || "N/A"}</span>
                  
                  {/* ✅ Merged Buttons Section */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => sendWhatsAppMessage(student)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                    </Button>

                    {student.status === "expired" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting === student.id}
                        onClick={() => handleDeleteUser(student.id, student.name)}
                      >
                        {isDeleting === student.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <><Trash2 className="mr-2 h-4 w-4" /> Remove</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Statistics Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-destructive">{students.filter(s => s.status === 'expired').length}</p>
              <p className="text-xs text-muted-foreground uppercase">Expired</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{students.filter(s => s.status === 'expiring').length}</p>
              <p className="text-xs text-muted-foreground uppercase">Expiring Soon</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{students.length}</p>
              <p className="text-xs text-muted-foreground uppercase">Total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}