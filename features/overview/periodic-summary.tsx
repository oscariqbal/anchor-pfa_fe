'use client'

// common components
import { SkeletonText } from "@/components/common/skeleton-component";

// ui components
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
// import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

// APIs
import transactionSummary from "@/features/overview/transaction-summary"

// types
import { periods, PeriodsType, GetSummaryType } from "@/features/overview/types";

// helpers
import helper from "@/features/overview/helper";

// others
import { useState, useEffect, useMemo } from "react";

/* mapper for grouping income/expense trends into one array-> for income/expense trends chart data
  const chartConfig = {
    amount: {
      label: "Amount"
    },
    income: {
      label: "Income",
      color: "#2ceb25",
    },
    expense: {
      label: "Expense",
      color: "#eb4325",
    },
  } satisfies ChartConfig
*/

export default function PeriodicSummary() {
  const [period, setPeriod] = useState<PeriodsType>(periods[2])
  const [summaryData, setSummaryData] = useState<GetSummaryType | null>(null)
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false)

  useEffect(() => {
    const range = helper(period)
    
    const ISOfrom = range.from.toISOString()
    const ISOto = range.to.toISOString()

    async function fetchData() {
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      setSummaryLoading(true)
      const summaryResult = await transactionSummary(`?from=${ISOfrom}&to=${ISOto}`)

      if (summaryResult.success) {
        setSummaryData(summaryResult.data)
        setSummaryLoading(false)
      } else {
        toast.error(summaryResult.errors.general?.[0] ?? summaryResult.message, {description: "Please try again", position: "top-center"})
        setSummaryLoading(false)
      }
    }

    fetchData()
  }, [period])

  /* mapper for grouping income/expense trends into one array-> for income/expense trends chart data
    const chartData = summaryData? [
        ...new Set([
          ...summaryData.incomeTrend?.map((item) => item.datetime) ?? [],
          ...summaryData.expenseTrend?.map((item) => item.datetime) ?? [],
        ]),
      ].map((datetime) => ({
        datetime,
        income:
          summaryData.incomeTrend?.find((item) => item.datetime === datetime)?.amount ?? 0,
        expense:
          summaryData.expenseTrend?.find((item) => item.datetime === datetime)?.amount ?? 0,
      }))
    : []
  */

  return (
    <section className="flex flex-col gap-4">
      <Select value={period} onValueChange={(value) => setPeriod(value as PeriodsType)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {periods.map((period) => (
              <SelectItem key={period} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="rounded-md bg-transparent col-span-2 md:col-span-1" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-sm">
              Cash Flow
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xl flex justify-between">
            <p>Rp.</p>
            {summaryLoading ? <SkeletonText /> : (<p className="font-bold">{summaryData?.cashFlow}</p>)}
          </CardContent>
        </Card>
        <Card className="rounded-md bg-transparent" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-sm">
              Total Income
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xl flex justify-between">
            <p>Rp.</p>
            {summaryLoading ? <SkeletonText /> : (<p className="font-bold text-green-500">{summaryData?.totalIncome}</p>)}
          </CardContent>
        </Card>
        <Card className="rounded-md bg-transparent" size="sm">
          <CardHeader>
            <CardDescription className="text-xs md:text-sm">
              Total Expense
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xl flex justify-between">
            <p>Rp.</p>
            {summaryLoading ? <SkeletonText /> : (<p className="font-bold text-red-500">{summaryData?.totalExpense}</p>)}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}