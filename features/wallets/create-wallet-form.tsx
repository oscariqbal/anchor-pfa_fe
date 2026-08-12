"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog"
import { Field, FieldGroup } from "../../components/ui/field"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "../../components/ui/select";
import { Plus } from 'lucide-react';
import createWallet from "./create-wallet";

const wallettypes = [
  { label: "CASH", value: "CASH" },
  { label: "BANK", value: "BANK" },
  { label: "E_MONEY", value: "E_MONEY" },
]

type Props = {
  type: string
}

export default function CreateWalletForm({type}: Props) {
  return (
    <Dialog>
      <form className="h-full w-full" onSubmit={createWallet}>
        <DialogTrigger className="h-full w-full" asChild>
          <Button variant="outline" className="h-full w-full opacity-100 cursor-pointer">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Create Wallet</DialogTitle>
            <DialogDescription>
              Create your wallet
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder={type}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wallettypes.map(({label, value}) => (
                    <SelectItem key={label} value={label} className="cursor-pointer">
                      {value}
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
        </DialogContent>
      </form>
    </Dialog>
  );
}