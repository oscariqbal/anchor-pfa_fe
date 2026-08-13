'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "../../components/ui/select";
import { Field, FieldGroup } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button";
import createWallet from "./create-wallet"
import { useRouter } from "next/navigation";
import { useState } from "react"

const wallettypes = [
  { label: "CASH", value: "CASH" },
  { label: "BANK", value: "BANK" },
  { label: "E_MONEY", value: "E_MONEY" },
]

export default function CreateWalletForm() {
  const [walletType, setWalletType] = useState("type");
  const [openDialog, setOpenDialog] = useState(false)

  const route = useRouter();
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      type: walletType,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }

    try {
      await createWallet(data);
      setOpenDialog(false);
      route.refresh();
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Create
        </Button>
      </DialogTrigger>
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
              <Input id="name" name="name" defaultValue="" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" defaultValue="" />
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