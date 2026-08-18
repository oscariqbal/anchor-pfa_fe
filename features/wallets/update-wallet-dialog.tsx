'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "../../components/ui/select";
import { Field, FieldGroup } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button";
import updateWallet from "./update-wallet"
import { useRouter } from "next/navigation";
import { useState } from "react"

const wallettypes = [
  { label: "CASH", value: "CASH" },
  { label: "BANK", value: "BANK" },
  { label: "E_MONEY", value: "E_MONEY" },
]

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
  prefillData?: {
    success: boolean
    message: string
    data?: Record<string, string>
  }
}

export default function UpdateWalletDialog({ open, onOpenChange, id, prefillData }: Props) {
  const [walletType, setWalletType] = useState(prefillData?.data?.type);
  const [error, setError] = useState<{
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  const route = useRouter();
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      type: walletType,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }

    const result = await updateWallet(data, id)

    if (result.success) {
      onOpenChange(false)
      route.refresh()
    } else {
      setError(result)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-base">Create Wallet</DialogTitle>
            <DialogDescription>
              Create your wallet
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="type">Type</Label>
              <Select value={walletType} onValueChange={setWalletType} >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wallettypes.map(({label, value}) => (
                    <SelectItem key={value} value={value} className="cursor-pointer">
                      {label}
                    </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={prefillData?.data?.name} />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue={prefillData?.data?.description} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}