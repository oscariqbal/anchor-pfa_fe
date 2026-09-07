export const periods = [ "Today", "This Week", "This Month", "This Year", ] as const

export type PeriodsType = typeof periods[number]

export type GetSummaryType = {
    totalIncome: string
    totalExpense: string
    cashFlow: string
    incomeTrend: {
      datetime: string
      amount: number
    }[]
    expenseTrend: {
      datetime: string
      amount: number
    }[]
  }