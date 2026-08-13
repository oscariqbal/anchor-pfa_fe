import { CreateType } from "./schema";

export default async function createWallet (data: CreateType) {
  const response = await fetch(`http://localhost:5555/api/wallets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Create wallet failed")
  }

  return response.json()
}