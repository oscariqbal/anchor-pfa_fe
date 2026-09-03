import { cookies } from "next/headers";
import { GetAllType } from "@/features/transactions/types";
import { ReturnTypes } from "@/types/return.types";

export default async function getTransactions(query?: string): Promise<ReturnTypes<GetAllType>> {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`http://localhost:5555/api/transactions?${query}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
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
      data: body.data
    }
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      errors: {general: ["Network error"]}
    }
  }
}
