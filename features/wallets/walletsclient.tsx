import { cookies } from "next/headers";

import * as WalletTypes from "./wallettypes";

const cookieStore = await cookies();

async function viewAllWallet(): Promise<WalletTypes.GetAll> {
  try {
    const response = await fetch("http://localhost:5555/api/wallets", {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
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

export {
  viewAllWallet
}