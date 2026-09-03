'use client'

// ui components
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

// APIs
import createTransaction from "@/features/transactions/create-transaction"

// schemas
import { createSchema, enumTransaction } from "@/features/transactions/schema";

// types
import { ViewAllType } from "@/features/wallets/schema";
import { CreateType } from "@/features/transactions/types";

// others
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

export default function CreateTransactionDialog({walletData}: {walletData: ViewAllType[]}) {
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const {register, handleSubmit, control, watch, formState: {errors}, setError, reset, resetField} = useForm<CreateType>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      type: "",
      amount: 0,
      note: "",
      time: "",
      sourceWalletId: undefined,
      destinationWalletId: undefined,
    }
  });
  
  const type = watch("type");

  useEffect(() => {
    if (type === "INCOME") {
      resetField("sourceWalletId");
    }

    if (type === "EXPENSE") {
      resetField("destinationWalletId");
    }
  }, [type, resetField])

  async function onSubmit (data: CreateType) {
    console.log("sdaw")
    const result = await createTransaction(data)
    console.log(result)

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
  }

  function onError(errors: FieldErrors<CreateType>) {
    console.log("ERROR", errors);
    console.log("sourceWalletId", watch("sourceWalletId"));
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-base">Create Transaction</DialogTitle>
            <DialogDescription>
              Create your transaction
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
                    {enumTransaction.map((option) => (
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
              <Label htmlFor="amount">Amount</Label>
              <Input {...register("amount", {valueAsNumber: true})} />
              {errors.amount && (
                <p className="text-red-400">{errors.amount.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="note">Note</Label>
              <Input {...register("note")} />
              {errors.note && (
                <p className="text-red-400">{errors.note.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="time">Time</Label>
              <Input type="datetime-local" {...register("time")} />
              {errors.time && (
                <p className="text-red-400">{errors.time.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="sourceWalletId">Source Wallet</Label>
              <Controller name="sourceWalletId" control={control} render={({field}) => (
                <Select disabled={type === "INCOME"} value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))} >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {walletData?.map(({id, type, name, balance}) => (
                      <SelectItem key={id} value={id.toString()} className="cursor-pointer">
                        ({type}) - {name} - {balance}
                      </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )} />
              {errors.sourceWalletId && (
                <p className="text-red-400">{errors.sourceWalletId.message}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="destinationWalletId">Destination Wallet</Label>
              <Controller name="destinationWalletId" control={control} render={({field}) => (
                <Select disabled={type === "EXPENSE"} value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))} >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {walletData?.map(({id, type, name, balance}) => (
                      <SelectItem key={id} value={id.toString()} className="cursor-pointer">
                        ({type}) - {name} - {balance}
                      </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )} />
              {errors.destinationWalletId && (
                <p className="text-red-400">{errors.destinationWalletId.message}</p>
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