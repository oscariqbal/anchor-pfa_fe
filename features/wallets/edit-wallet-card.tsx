'use client'

// ui components
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// api
import viewWallet from "./view-wallet";

// schema and types
import { enumWallet } from "./schema"

// others
import EditWalletDialog from "./edit-wallet-dialog"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

type WalletType = "CASH" | "BANK" | "E_MONEY";

type UpdateWallet = {
  type: WalletType;
  name: string;
  description: string;
};

export default function EditWalletCard({ id }: Record<string, number>) {
  const [getData, setGetData] = useState<{ 
    success: boolean;
    message: string;
    data?: Record<string, string>
  } | null>(null);
  const [walletType, setWalletType] = useState<string>("")
  const [updateData, setUpdateData] = useState<UpdateWallet>()
  const [error, setError] = useState<{
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);
  const [openDialog, setOpenDialog] = useState(false)

  const route = useRouter();

  useEffect(() => {
    async function getResult(id: number) {
      const getResult = await viewWallet(id)

      if (getResult.success) {
        setGetData(getResult)
        setWalletType(getResult.data?.type)
      } else {
        setError(getResult)
      }
    }

    getResult(id)
  }, [])

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!walletType) return;

    const formData = new FormData(e.currentTarget);
    const updateData = {
      type: walletType as WalletType,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }

    setUpdateData(updateData)
    setOpenDialog(true)
  };

  return (
    <>
      {getData?.data && (
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <CardContent>
              <FieldGroup>
                <Field>
                  <Label htmlFor="type">Type</Label>
                  <Select value={walletType} onValueChange={setWalletType} >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {enumWallet.map((option) => (
                        <SelectItem key={option} value={option} className="cursor-pointer">
                          {option}
                        </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={getData.data.name} />
                </Field>
                <Field>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" defaultValue={getData.data.description} />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex ml-auto gap-2">
              <Button variant={"outline"} asChild className="cursor-pointer">
                <Link href={`/wallets/${id}`}>
                  Cancel
                </Link>
              </Button>
              <Button type="submit" className="cursor-pointer">Submit</Button>
            </CardFooter>
          </form>
          <EditWalletDialog open={openDialog} onOpenChange={setOpenDialog} id={id} updateData={updateData}/>
        </Card>
      )}
    </>
  );
}