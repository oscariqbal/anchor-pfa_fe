import { cookies } from "next/headers";
import { GetWallet } from "./types";


export default async function viewWallet(id: number): Promise<GetWallet> {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`http://localhost:5555/api/wallets/${id}`, {
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
      data: {
        id: 0,
        type: null,
        name: "",
        description: ""
      }
    }
  }
}