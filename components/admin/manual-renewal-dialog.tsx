"use client"

import { useState } from "react"
import { Edit, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
}

interface ManualRenewalDialogProps {
  user: User
  onSuccess?: () => void
}

export function ManualRenewalDialog({ user, onSuccess }: ManualRenewalDialogProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const planPrices = {
    monthly: 500,
    quarterly: 1350,
    halfYearly: 2550,
    yearly: 4800,
  }

  const [renewalData, setRenewalData] = useState({
    plan: "monthly",
    startDate: new Date().toISOString().split('T')[0],
    months: 1,
  })

  const calculateEndDate = () => {
    const start = new Date(renewalData.startDate)
    const end = new Date(start)
    end.setMonth(end.getMonth() + renewalData.months)
    return end.toLocaleDateString()
  }

  const handleSubmit = async () => {
    if (!user) return

    try {
      setSubmitting(true)
      
      const response = await fetch('/api/admin/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          plan: renewalData.plan,
          startDate: renewalData.startDate,
          months: renewalData.months,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Subscription updated for ${user.name}`,
        })
        setShowDialog(false)
        if (onSuccess) onSuccess()
      } else {
        toast({
          title: "Failed",
          description: data.message || "Could not update subscription",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating subscription:", error)
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowDialog(true)}
      >
        <Edit className="h-3 w-3 mr-1" />
        Renew
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Subscription</DialogTitle>
            <DialogDescription>
              Manually update subscription for {user?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="plan">Plan</Label>
              <Select 
                value={renewalData.plan} 
                onValueChange={(value) => setRenewalData(prev => ({ ...prev, plan: value }))}
              >
                <SelectTrigger id="plan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly - ₹500</SelectItem>
                  <SelectItem value="quarterly">Quarterly - ₹1,350</SelectItem>
                  <SelectItem value="halfYearly">Half Yearly - ₹2,550</SelectItem>
                  <SelectItem value="yearly">Yearly - ₹4,800</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={renewalData.startDate}
                onChange={(e) => setRenewalData(prev => ({ 
                  ...prev, 
                  startDate: e.target.value 
                }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="months">Duration (Months)</Label>
              <Input
                id="months"
                type="number"
                min="1"
                max="24"
                value={renewalData.months}
                onChange={(e) => setRenewalData(prev => ({ 
                  ...prev, 
                  months: Number(e.target.value) 
                }))}
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded">
                <Calendar className="h-4 w-4" />
                <span>End Date: {calculateEndDate()}</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Summary
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    {renewalData.plan.charAt(0).toUpperCase() + renewalData.plan.slice(1)} plan for {renewalData.months} month(s)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)} 
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}