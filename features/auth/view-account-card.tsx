"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import viewAccount from "./view-account";

export default function ViewAccount() {
  const [data, setData] = useState<{ 
    success: boolean;
    message: string;
    data?: Record<string, string>
  } | null>(null);
  const [error, setError] = useState<{ 
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  useEffect(() => {
    async function result () {
      const result = await viewAccount()
      
      if (result.success) {
        setData(result)
      } else {
        setError(result)
      }
    }
    
    result()
  }, []);

  return (
    <>
      {data && (
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
        {data.data && (
          Object.entries(data.data).map(([key, value]) => (
          <div key={key} className="flex w-full sm:w-1/2 lg:w-1/4 gap-2 text-sm text-muted-foreground">
            <p className="flex-[2] capitalize">{key}</p>
            <p className="flex-[1] text-center">:</p>
            <p className="flex-[3]">{value}</p>
          </div>
        )))}
        </CardContent>
      </Card>
      )}
    </>
  );
}