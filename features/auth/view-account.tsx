'use client'

// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// common components
import { SkeletonComponent } from "@/components/common/skeleton-component";
import ErrorComponent from "@/components/common/error-component";

// APIs
import getAccount from "@/features/auth/get-account";

// types
import { GetType } from "@/features/auth/types";
import { ErrorReturnTypes } from "@/types/return.types";

// others
import { useEffect, useState } from "react"

export default function ViewAccount() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorReturnTypes | null>(null)
  const [data, setData] = useState<GetType | null>(null)

  useEffect(() => {
    async function getAccountData() {
      setLoading(true)

      // await new Promise((resolve) => setTimeout(resolve, 5000))
      const result = await getAccount()

      if (!result.success) {
        setLoading(false)
        setError(result)
        return
      }
      
      setData(result.data)
      setLoading(false)
    }

    getAccountData()
  }, [])

  return (
    <>
      {loading && (
        <SkeletonComponent className="h-40"/>
      )}
      {error && (
        <ErrorComponent message={error.message}/>
      )}
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
              <dl className="flex flex-col gap-2">
                <div className="grid grid-cols-4 md:grid-cols-8">
                  <dt>Name</dt>
                  <dd>:</dd>
                  <dd>{data.name}</dd>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-8">
                  <dt>Email</dt>
                  <dd>:</dd>
                  <dd>{data.email}</dd>
                </div>
              </dl>
          </CardContent>
        </Card>
      )}
    </>
  );
}