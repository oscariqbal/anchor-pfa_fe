'use client'

// ui components
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

// APIs
import createWallet from "@/features/wallets/create-wallet"

// schemas
import { createSchema, enumWallet } from "@/features/wallets/schema";

// types
import { CreateType } from "@/features/wallets/types"

// icons
import { Plus } from "lucide-react"

// others
import { useState } from "react"
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";

export default function CreateWalletDialog() {
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const {register, handleSubmit, control, formState: {errors, isSubmitting}, setError, reset} = useForm<CreateType>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
    defaultValues: {
      type: "",
      name: "",
      description: "",
    }
  });

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
          message: result.errors.general[0] ?? result.message,
        });
        toast.error(result.errors.general[0] ?? result.message, {description: "Please try again", position: "top-center"})
      }
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-identity/80 hover:bg-identity">
          <Plus data-icon="inline-start" className="size-4" />
          Add wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Add a Wallet</DialogTitle>
          <DialogDescription>Enter your wallet detail below</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer bg-identity/80 hover:bg-identity" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </FieldSet>
      </DialogContent>
    </Dialog>
  );
}