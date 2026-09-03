'use client'

// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

// APIs
import viewAccount from "./view-account";

// schemas and types
import { GetResType } from "@/features/auth/schema";

// others
import { useEffect, useState } from "react"

export default function ViewAccount() {
  const [accountData, setAccountData] = useState<GetResType | null>(null)

  useEffect(() => {
    async function getAccountData() {
      const result = await viewAccount()

      if (!result.success) {
        toast.error(result.message)
        return
      }
      
      setAccountData(result.data)
    }

    getAccountData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        {accountData && (
          <dl className="flex flex-col gap-2">
            <div className="grid grid-cols-4 md:grid-cols-8">
              <dt>Name</dt>
              <dd>:</dd>
              <dd>{accountData.name}</dd>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8">
              <dt>Email</dt>
              <dd>:</dd>
              <dd>{accountData.email}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}