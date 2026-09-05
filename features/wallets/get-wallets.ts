// types
import { GetAllType } from "@/features/wallets/types";
import { ReturnTypes } from "@/types/return.types";

// others
import { cookies } from "next/headers";

export default async function getWallets(): Promise<ReturnTypes<GetAllType>> {
  const cookieStore = await cookies();
  try {
    const response = await fetch("http://localhost:5555/api/wallets", {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
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
