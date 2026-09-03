import { GetResType } from "@/features/auth/schema";
import { ReturnTypes } from "@/types/return";

export default async function viewAccount (): Promise<ReturnTypes<GetResType>> {
  try {
    const response = await fetch("http://localhost:5555/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    const body = await response.json();
    
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