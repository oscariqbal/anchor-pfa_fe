import { UpdateType } from "./schema";

export default async function updateWallet (data: UpdateType, id: number) {
  try {
    const response = await fetch(`http://localhost:5555/api/wallets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      data: body.data
    }
  } catch (error) {
    return {
      success: false,
      message: "Network error"
    }
  }
}