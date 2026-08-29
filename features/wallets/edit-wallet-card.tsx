'use client'

// ui components
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// custom components
import EditWalletDialog from "./edit-wallet-dialog"

// APIs
import viewWallet from "./view-wallet";
import updateWallet from "./edit-wallet"

// schemas and types
import { updateSchema, UpdateType, enumWallet } from "@/features/wallets/schema";

// others
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function EditWalletCard({id, oldWallet}: {id: number, oldWallet: UpdateType}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState<UpdateType | null>(null)

  const route = useRouter();
  
  const {register, handleSubmit, control, formState: {errors}, setError, reset} = useForm<UpdateType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      type: oldWallet.type,
      name: oldWallet.name,
      description: oldWallet.description,
    }
  });

  function onSubmit (data: UpdateType) {
    setFormData(data)
    setOpenDialog(true)
  };

  async function handleConfirm () {
    if (!formData) return
    const updateResult = await updateWallet(formData, id)
    
    if (updateResult.success) {
      reset()
      setOpenDialog(false)
      route.replace(`/wallets/${id}`)
    } else {
      if (updateResult.errors.field) {
        applyFieldErrors(updateResult.errors.field, setError) // type assertion issue here
      }
      if (updateResult.errors?.general) {
        setError("root.serverError", {
          type: "server",
          message: updateResult.errors.general,
        });
      }
    }
  }

  return (
    <Card className="bg-transparent">
      <form id="update-wallet" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex ml-auto gap-2">
          <Button variant={"outline"} asChild className="cursor-pointer">
            <Link href={`/wallets/${id}/`}>
              Cancel
            </Link>
          </Button>
          <Button type="submit" className="cursor-pointer">Submit</Button>
        </CardFooter>
      </form>
      <EditWalletDialog open={openDialog} onOpenChange={setOpenDialog} onConfirm={handleConfirm} />
    </Card>
  );
}