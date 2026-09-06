'use client'

// ui components
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"

// features components
import EditWalletDialog from "@/features/wallets/edit-wallet-dialog"

// APIs
import updateWallet from "@/features/wallets/update-wallet"

// schemas
import { updateSchema, enumWallet } from "@/features/wallets/schema";

// types
import { GetType, UpdateType } from "@/features/wallets/types";

// others
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";

export default function EditWalletCard({id, oldWallet}: {id: number, oldWallet: GetType}) {
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState<UpdateType | null>(null)
  
  const {register, handleSubmit, control, formState: {errors, isSubmitting}, setError, reset} = useForm<UpdateType>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
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
          message: updateResult.errors.general[0] ?? updateResult.message,
        });
        toast.error(updateResult.errors.general[0] ?? updateResult.message, {description: "Please try again", position: "top-center"})
      }
    }
  }

  return (
    <Card className="bg-transparent">
      <FieldSet>
        <form id="update-wallet" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
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
                  <p className="text-destructive">{errors.type.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...register("name")} />
                {errors.name && (
                  <p className="text-destructive">{errors.name.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea 
                  {...register("description")}
                  id="textarea-message" 
                  placeholder="National Bank"
                />
                {errors.description && (
                  <p className="text-destructive">{errors.description.message}</p>
                )}
              </Field>
            </FieldGroup>
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
      </FieldSet>
      <EditWalletDialog open={openDialog} onOpenChange={setOpenDialog} onConfirm={handleConfirm} isSubmitting={isSubmitting} />
    </Card>
  );
}