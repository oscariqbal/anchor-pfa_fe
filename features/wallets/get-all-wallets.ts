import { cookies } from "next/headers";
import { GetAllWallets } from "./types";


export default async function viewAllWallets(): Promise<GetAllWallets> {
  const cookieStore = await cookies();
  try {
    const response = await fetch("http://localhost:5555/api/wallets", {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wallets");
    }

    return response.json()
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      data: []
    }
  }
}