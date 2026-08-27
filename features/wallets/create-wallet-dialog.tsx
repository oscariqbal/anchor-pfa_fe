'use client'

// ui components
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

// APIs
import createWallet from "@/features/wallets/create-wallet"

// schemas and types
import { createSchema, CreateType, enumWallet } from "@/features/wallets/schema";

// others
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateWalletDialog() {
  const {register, handleSubmit, control, formState: {errors}, setError, reset} = useForm<CreateType>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      type: "",
      name: "",
      description: ""
    }
  });

  const [openDialog, setOpenDialog] = useState(false)

  const route = useRouter();
  
  async function onSubmit (data: CreateType) {
    const result = await createWallet(data)

    if (result.success) {
      reset()
      setOpenDialog(false)
      route.refresh()
    } else {
      if (result.errors.field) {
        applyFieldErrors(result.errors.field, setError) // type assertion issue here
      }
      if (result.errors?.general) {
        setError("root.serverError", {
          type: "server",
          message: result.errors.general,
        });
      }
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-base">Create Wallet</DialogTitle>
            <DialogDescription>
              Create your wallet
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="type">Type</Label>
              <Controller name="type" control={control} render={({field}) => (
                <Select value={field.value} onValueChange={field.onChange} >
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
              )} />
              {errors.type && (
                <p className="text-red-400">{errors.type.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-400">{errors.name.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input {...register("description")} />
              {errors.description && (
                <p className="text-red-400">{errors.description.message}</p>
              )}
            </Field>
          </FieldGroup>
          {errors.root?.serverError && (
            <p className="text-red-400">{errors.root.serverError.message}</p>
          )}
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