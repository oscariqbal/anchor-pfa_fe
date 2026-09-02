type TransactionSummary = {
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
}

type TransactionSummaryResult =
  | {
      success: true
      message: string
      data: TransactionSummary
    }
  | {
      success: false
      message: string
      errors: {
        field?: Record<string, string[]>
        general?: string[]
      }
    }

export default async function transactionSummary (query: string): Promise<TransactionSummaryResult> {
  try {
    const response = await fetch(`http://localhost:5555/api/transactions/summary${query}`, {
      method: "GET",
      credentials: "include"
    });

    const body = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: body.message,
        errors: body.errors
      }
    }

    return {
      success: true,
      message: body.message,
      data: body.data,
    }
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      errors: {general: ["Network error"]}
    }
  }
}