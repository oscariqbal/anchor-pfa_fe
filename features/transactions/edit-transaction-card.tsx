'use client'

// ui components
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// custom components
import EditTransactionDialog from "./edit-transaction-dialog"

// APIs
import updateTransaction from "./edit-transaction"

// schemas and types
import { updateSchema, UpdateType, enumTransaction } from "@/features/transactions/schema";
import { ViewAllType } from "@/features/wallets/schema";

// others
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function EditTransactionCard({id, wallets, oldTransaction}: {id: number, wallets: ViewAllType[], oldTransaction: UpdateType}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState<UpdateType | null>(null)

  const route = useRouter();
  
  const {register, handleSubmit, control, watch, formState: {errors}, setError, reset, resetField} = useForm<UpdateType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      type: oldTransaction.type,
      amount: oldTransaction.amount,
      note: oldTransaction.note,
      time: oldTransaction.time,
      sourceWalletId: oldTransaction.sourceWalletId,
      destinationWalletId: oldTransaction.destinationWalletId,
    }
  });

  const type = watch("type");

  useEffect(() => {
    if (type === "INCOME") {
      resetField("sourceWalletId", {defaultValue: undefined});
    }

    if (type === "EXPENSE") {
      resetField("destinationWalletId", {defaultValue: undefined});
    }
  }, [type, resetField])

  function onSubmit (data: UpdateType) {
    setFormData(data)
    setOpenDialog(true)
  };

  async function handleConfirm () {
    if (!formData) return
    const updateResult = await updateTransaction(formData, id)
    
    if (updateResult.success) {
      reset()
      setOpenDialog(false)
      route.replace(`/transactions/${id}`)
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
    <Card>
      <form id="update-transaction" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                      {wallets?.map(({id, type, name, balance}) => (
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
                      {wallets?.map(({id, type, name, balance}) => (
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
        </CardContent>
        <CardFooter className="flex ml-auto gap-2">
          <Button variant={"outline"} asChild className="cursor-pointer">
            <Link href={`/transactions/${id}`}>
              Cancel
            </Link>
          </Button>
          <Button type="submit" className="cursor-pointer">Submit</Button>
        </CardFooter>
      </form>
      <EditTransactionDialog open={openDialog} onOpenChange={setOpenDialog} onConfirm={handleConfirm} />
    </Card>
  );
}