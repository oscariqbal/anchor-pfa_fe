// types
import { ReturnTypes } from "@/types/return.types";
import { GetType } from "@/features/wallets/types";

// others
import { cookies } from "next/headers";

export default async function getWallet(id: number): Promise<ReturnTypes<GetType>> {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`http://localhost:5555/api/wallets/${id}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
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
      errors: {}
    }
  }
}
