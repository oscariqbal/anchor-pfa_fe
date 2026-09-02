'use client'

// ui components
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardDescription, CardAction} from "@/components/ui/card"
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator";

// APIs
import transactionSummary from "@/features/overview/transaction-summary"

// others
import Link from "next/link";
import { useState, useEffect } from "react";
import periodRange from "@/features/overview/period-range";
import { cn } from "@/lib/utils";

// ?from=2026-08-01T00:00&to=2026-08-31T23:59&granularity=month

const chartConfig = {
  income: {
    label: "income",
    color: "#2ceb25",
  },
  expense: {
    label: "expense",
    color: "#eb4325",
  },
} satisfies ChartConfig

const periods = [
  { label: "Today", value: "today", granularity: "day" },
  { label: "This Week", value: "week", granularity: "day" },
  { label: "This Month", value: "month", granularity: "day" },
  { label: "This Year", value: "year", granularity: "month" },
] as const

type PeriodsType = typeof periods[number]["value"]

function formatDateTime(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  console.log(`${year}-${month}-${day}T${hours}:${minutes}`)
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

type ViewAllType = {
  id: number,
  type: string,
  amount: string,
  note: string,
  time: string,
  sourceWallet?: {
    id: number,
    name: string
  },
  destinationWallet?: {
    id: number,
    name: string
  },
}

export default function PeriodicSummary() {
  const [period, setPeriod] = useState<PeriodsType>(periods[0].value)
  const [summaryError, setSummaryError] = useState<{
    field?: Record<string, string[]>
    general?: string[]
  } | null>(null)
  const [summaryData, setSummaryData] = useState<{
    totalIncome: string
    totalExpense: string
    cashFlow: string
    incomeTrend: {
      time: string
      amount: number
    }[]
    expenseTrend: {
      time: string
      amount: number
    }[]
  } | null>(null)

  useEffect(() => {
    const range = periodRange(period)
    const from = formatDateTime(range.from)
    const to = formatDateTime(range.to)

    async function fetchData() {
      const summaryResult = await transactionSummary(`?from=${from}&to=${to}&granularity=${periods.find(p => p.value === period)?.granularity}`)

      if (summaryResult.success) {
        setSummaryData(summaryResult.data)
      } else {
        setSummaryError(summaryResult.errors)
      }
    }

    fetchData()
  }, [period])

  const chartData = summaryData? [
      ...new Set([
        ...summaryData.incomeTrend.map((item) => item.time),
        ...summaryData.expenseTrend.map((item) => item.time),
      ]),
    ].map((time) => ({
      time,
      income:
        summaryData.incomeTrend.find((item) => item.time === time)?.amount ?? 0,
      expense:
        summaryData.expenseTrend.find((item) => item.time === time)?.amount ?? 0,
    }))
  : []

  return (
    <section className="flex flex-col gap-4">
      <Select value={period} onValueChange={(value) => setPeriod(value as PeriodsType)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {periods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis dataKey="income" ticks={["1000", "2000", "3000", "4000", "5000"]} tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis dataKey="expense" ticks={["1000", "2000", "3000", "4000", "5000"]} tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line dataKey="income"  fill="var(--color-income)" stroke="var(--color-income)" radius={4} />
          <Line dataKey="expense" fill="var(--color-expense)" stroke="var(--color-expense)" radius={4} />
        </LineChart>
      </ChartContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="rounded-md col-span-2 md:col-span-1" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-base">
              Cash Flow
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{summaryData?.cashFlow}</p>
          </CardContent>
        </Card>
        <Card className="rounded-md" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-base">
              Total Income
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{summaryData?.totalIncome}</p>
          </CardContent>
        </Card>
        <Card className="rounded-md" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-base">
              Total Expense
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg flex justify-between">
            <p>Rp.</p>
            <p className="font-bold">{summaryData?.totalExpense}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}