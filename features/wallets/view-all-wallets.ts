import { cookies } from "next/headers";
import { GetListType, getListSchema } from "./schema";

export default async function viewAllWallets(): Promise<GetListType> {
  const cookieStore = await cookies();
  const response = await fetch("http://localhost:5555/api/wallets", {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallets");
  }

  return await response.json();
}