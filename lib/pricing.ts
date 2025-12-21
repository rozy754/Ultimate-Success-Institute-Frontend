export type Duration = "1 Month" | "3 Months" | "7 Months"
export type Shift = "Full Day" | "Morning" | "Evening"
export type SeatType = "Regular" | "Special"

export const PRICING: Record<Duration, Record<Shift, Record<SeatType, number>>> = {
  "1 Month": {
    "Full Day": { Regular: 850, Special: 950 },
    "Morning": { Regular: 650, Special: 700 },
    "Evening": { Regular: 550, Special: 600 },
  },
  "3 Months": {
    "Full Day": { Regular: 2400, Special: 2700 },
    "Morning": { Regular: 1800, Special: 2000 },
    "Evening": { Regular: 1500, Special: 1700 },
  },
  "7 Months": {
    "Full Day": { Regular: 5100, Special: 5700 },
    "Morning": { Regular: 3900, Special: 4200 },
    "Evening": { Regular: 3300, Special: 3600},
  },
}

export function getBasePrice(duration: Duration, shift: Shift, seat: SeatType): number {
  return PRICING[duration][shift][seat]
}

export function perMonth(amount: number, duration: Duration): number {
  const months = duration === "1 Month" ? 1 : duration === "3 Months" ? 3 : 7
  return Math.round(amount / months)
}

export function savingsPerMonth(duration: Duration, shift: Shift, seat: SeatType): number {
  if (duration === "1 Month") return 0
  const monthlyBase = PRICING["1 Month"][shift][seat]
  const thisPerMonth = perMonth(PRICING[duration][shift][seat], duration)
  return Math.max(0, monthlyBase - thisPerMonth)
}