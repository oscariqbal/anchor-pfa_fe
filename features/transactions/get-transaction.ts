// types
import { ReturnTypes } from "@/types/return.types";
import { GetType } from "@/features//transactions/types";

// others
import { cookies } from "next/headers";

export default async function getTransaction(id: number): Promise<ReturnTypes<GetType>> {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`http://localhost:5555/api/transactions/${id}`, {
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
