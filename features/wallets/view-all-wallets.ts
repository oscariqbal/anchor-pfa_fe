import { cookies } from "next/headers";
import { ViewAllType } from "./schema";

export default async function viewAllWallets(): Promise<
    |  {
        success: true
        message: string
        data: ViewAllType[]
      }
    |  {
        success: false
        message: string
        errors: unknown
      }
  > {
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
      errors: "Network error"
    }
  }
}
