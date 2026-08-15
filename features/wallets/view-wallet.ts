import { cookies } from "next/headers";
import { GetType, getSchema } from "./schema";

export default async function viewWallet(id: number): Promise<GetType> {
  const cookieStore = await cookies();
  const response = await fetch(`http://localhost:5555/api/wallets/${id}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallets");
  }

  return await response.json()
}