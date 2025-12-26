"use client"

import { Button } from "@/components/ui/button"
import { useRazorpayCheckout } from "@/components/hooks/useRazorpayCheckout"

interface Props {
  plan: string
  amount: number
  duration: string
  shift: string
  seatType: string
  addOns?: { registration: boolean; locker: boolean }
  label?: string
}

export default function RazorpayCheckout({ 
  plan, 
  amount, 
  duration,
  shift,
  seatType,
  addOns,
  label = "Pay Now" 
}: Props) {
  const { startPayment } = useRazorpayCheckout()

  return (
    <Button onClick={() => startPayment(plan, amount, {
      duration,
      shift,
      seatType,
      amount,
      planName: plan,
      addOns
    })}>
      {label}
    </Button>
  )
}
