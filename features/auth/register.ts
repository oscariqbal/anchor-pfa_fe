import { RegisterReqType } from "./schema";
import { ReturnTypes } from "@/types/return";

export default async function regist (data: RegisterReqType): Promise<ReturnTypes> {
  try {
    const response = await fetch(`http://localhost:5555/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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