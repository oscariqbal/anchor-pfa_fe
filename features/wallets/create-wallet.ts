'use client'

import { CreateType, createSchema } from "./schema";
import { useState } from "react";

export default async function createWallet(e: React.FormEvent<HTMLFormElement>): Promise<CreateType> {
  const formData = new FormData(e.currentTarget);

  const type = formData.get("type");
  const name = formData.get("name");
  const description = formData.get("description");

  const response = await fetch(`http://localhost:5555/api/wallets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      name,
      description,
      isArchived: false
    }),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallets");
  }

  const data = await response.json()

  return createSchema.parse(data)
}