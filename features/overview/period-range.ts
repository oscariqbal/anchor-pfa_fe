export default function periodRange(period: "today" | "week" | "month" | "year"): {from: Date, to: Date} {
  const now = new Date()

  if (period === "today") {
    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const to = new Date(from)
    to.setDate(from.getDate() + 1)

    return { from, to }
  }

  if (period === "week") {
    const day = now.getDay()
    const daysFromMonday = day === 0 ? 6 : day - 1

    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    from.setDate(now.getDate() - daysFromMonday)

    const to = new Date(from)
    to.setDate(from.getDate() + 7)

    return { from, to }
  }

  if (period === "month") {
    const from = new Date(now.getFullYear(), now.getMonth())
    const to = new Date(now.getFullYear(), now.getMonth() + 1)

    return { from, to }
  }

  const from = new Date(now.getFullYear(), 0)
  const to = new Date(now.getFullYear() + 1, 0)

  return { from, to }
}