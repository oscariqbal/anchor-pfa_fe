'use client'

// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// APIs
import viewAccount from "./view-account";

// others
import { useEffect, useState } from "react"

export default function ViewAccount() {
  const [accountData, setAccountData] = useState<{
    id: number
    name: string
    email: string
  } | null>(null)
  const [accountError, setAccountError] = useState()

  useEffect(() => {
    async function getAccountData() {
      const result = await viewAccount()

      if (result.success) {
        setAccountData(result.data)
      } else {
        setAccountError(result.errors)
      }
    }

    getAccountData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        {accountData ? (
          <dl className="flex flex-col gap-2">
            <div className="grid grid-cols-2">
              <dt>Id</dt>
              <dd>{accountData.id}</dd>
            </div>
            <div className="grid grid-cols-2">
              <dt>Name</dt>
              <dd>{accountData.name}</dd>
            </div>
            <div className="grid grid-cols-2">
              <dt>Email</dt>
              <dd>{accountData.email}</dd>
            </div>
          </dl>
        ): accountError && (
          <p>Failed to fetch account data</p>
        )}
      </CardContent>
    </Card>
  );
}