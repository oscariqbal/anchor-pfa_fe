// types
import { ReturnTypes } from "@/types/return.types";
import { GetSummaryType } from "@/features/overview/types";

export default async function transactionSummary (query: string): Promise<ReturnTypes<GetSummaryType>> {
  try {
    const response = await fetch(`http://localhost:5555/api/transactions/summary${query}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store"
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
      errors: {}
    }
  }
}