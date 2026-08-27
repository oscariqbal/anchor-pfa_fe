import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import viewAccount from "./view-account";

type Data = {
  id: number
  name: string
  email: string
}

export default async function ViewAccount() {
  const result = await viewAccount()
      
  if (!result.success) {
    return (
      <p>failed to fetch account data</p>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-2">
          <div className="grid grid-cols-2">
            <dt>Id</dt>
            <dd>{result.data.id}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Name</dt>
            <dd>{result.data.name}</dd>
          </div>
          <div className="grid grid-cols-2">
            <dt>Email</dt>
            <dd>{result.data.email}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}