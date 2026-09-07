export default function helper(period: "Today" | "This Week" | "This Month" | "This Year"): {from: Date, to: Date} {
  const now = new Date()

  if (period === "Today") {
    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const to = new Date(from)
    to.setDate(from.getDate() + 1)

    return { from, to }
  }

  if (period === "This Week") {
    const day = now.getDay()
    const daysFromMonday = day === 0 ? 6 : day - 1

    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    from.setDate(now.getDate() - daysFromMonday)

    const to = new Date(from)
    to.setDate(from.getDate() + 7)

    return { from, to }
  }

  if (period === "This Month") {
    const from = new Date(now.getFullYear(), now.getMonth())
    const to = new Date(now.getFullYear(), now.getMonth() + 1)

    return { from, to }
  }

  const from = new Date(now.getFullYear(), 0)
  const to = new Date(now.getFullYear() + 1, 0)

  return { from, to }
}

/* grouping function reference for income/expense trends chart

  import { Prisma } from "@prisma/client";
  import { GranularityType } from "../features/transaction/transaction.schema";
  import { parseISO, startOfWeek, format } from "date-fns";

  type TrendItem = {
    amount: Prisma.Decimal
    time: string
  };

  type GroupedTrendItem = {
    time: string
    amount: number
  };

  function getGroupKey(time: string, granularity: GranularityType) {
    if (granularity === "week") {
      const date = parseISO(time)
      const weekStart = startOfWeek(date, {weekStartsOn: 1})

      return format(weekStart, "yyyy-MM-dd")

    } else if (granularity === "month") {
      return time.slice(0, 7)
    }

    return time.slice(0, 10)
  }

  export function groupTrend(transactions: TrendItem[], granularity: GranularityType): GroupedTrendItem[] {
    const grouped = new Map<string, number>()

    for (const transaction of transactions) {
      const key = getGroupKey(transaction.time, granularity)
      const amount = Number(transaction.amount)

      grouped.set(key, (grouped.get(key) ?? 0) + amount)
    }

    return Array.from(
      grouped,
      ([time, amount]) => ({ time, amount })
    )
  }

*/