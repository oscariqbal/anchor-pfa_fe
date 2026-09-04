'use client'

// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// others
import { useUser } from "@/contexts/UserContext"

export default function ViewAccount() {
  const user = useUser()
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
            <dl className="flex flex-col gap-2">
              <div className="grid grid-cols-4 md:grid-cols-8">
                <dt>Name</dt>
                <dd>:</dd>
                <dd>{user.name}</dd>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8">
                <dt>Email</dt>
                <dd>:</dd>
                <dd>{user.email}</dd>
              </div>
            </dl>
        </CardContent>
      </Card>
    </>
  );
}