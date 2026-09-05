'use client'

// ui components
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"

// custom components
import EditTransactionDialog from "./edit-transaction-dialog"

// APIs
import updateTransaction from "./update-transaction"

// schemas
import { updateFormSchema, enumTransaction } from "@/features/transactions/schema";

// types
import { ViewAllType } from "@/features/wallets/schema";
import { GetType } from "@/features//transactions/types";
import { UpdateFormType } from "@/features/transactions/types";

// icons
import { ChevronDownIcon } from "lucide-react"

// others
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";

export default function EditTransactionCard({id, wallets, oldTransaction}: {id: number, wallets: ViewAllType[], oldTransaction: GetType}) {
  const user = useUser()
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState<UpdateFormType | null>(null)

  const localDate = toZonedTime(oldTransaction.datetime, user.timezone)
  
  const {register, handleSubmit, control, watch, formState: {errors, isSubmitting}, setError, reset, resetField} = useForm<UpdateFormType>({
    resolver: zodResolver(updateFormSchema),
    mode: "onChange",
    defaultValues: {
      type: oldTransaction.type,
      amount: oldTransaction.amount,
      note: oldTransaction.note,
      date: localDate,
      time: format(localDate, "HH:mm"),
      sourceWalletId: oldTransaction.sourceWallet?.id,
      destinationWalletId: oldTransaction.destinationWallet?.id,
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

  function onSubmit (data: UpdateFormType) {
    setFormData(data)
    setOpenDialog(true)
  };

  async function handleConfirm () {
    if (!formData) return

    const date = formData.date ?? localDate

    const datetime = new Date(date)
    const [hours, minutes] = (formData.time??format(localDate, "HH:mm")).split(":").map(Number)
    datetime.setHours(hours, minutes, 0, 0)

    const utcDate = fromZonedTime(datetime, user.timezone)

    const updateResult = await updateTransaction({...formData, datetime: utcDate.toISOString()}, id)

    if (updateResult.success) {
      reset()
      setOpenDialog(false)
      route.replace(`/transactions/${id}`)
    } else {
      if (updateResult.errors.field) {
        applyFieldErrors(updateResult.errors.field, setError) // type assertion issue here
      }
      if (updateResult.errors.general) {
        setError("root.serverError", {
          message: updateResult.errors.general[0] ?? updateResult.message
        });
      }
      toast.error(updateResult.errors.general?.[0] ?? updateResult.message, {description: "Please try again", position: "top-center"})
    }
  }

  return (
    <Card>
      <FieldSet>
        <form id="update-transaction" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                  <p className="text-destructive">{errors.type.message}</p>
                )}
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="sourceWalletId">Source Wallet</FieldLabel>
                  <Controller name="sourceWalletId" control={control} render={({field}) => (
                    <Select 
                      disabled={type === "INCOME"} 
                      value={field.value?.toString()} 
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
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
                    <p className="text-destructive">{errors.sourceWalletId.message}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="destinationWalletId">Destination Wallet</FieldLabel>
                  <Controller name="destinationWalletId" control={control} render={({field}) => (
                    <Select 
                      disabled={type === "EXPENSE"} 
                      value={field.value?.toString()} 
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
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
                    <p className="text-destructive">{errors.destinationWalletId.message}</p>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input {...register("amount", {valueAsNumber: true})} />
                {errors.amount && (
                  <p className="text-destructive">{errors.amount.message}</p>
                )}
              </Field>
              <div className="flex gap-4">
                <Field className="flex-1 min-w-0">
                  <FieldLabel htmlFor="date">Date</FieldLabel>
                  <Controller name="date" control={control} render={({field}) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground flex justify-between">
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <ChevronDownIcon data-icon="inline-end" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={field.onChange}
                          defaultMonth={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                  )} />
                  {errors.date && (
                    <p className="text-destructive">{errors.date.message}</p>
                  )}
                </Field>
                <Field className="w-auto">
                  <FieldLabel htmlFor="time">Time</FieldLabel>
                  <Input
                    {...register("time")}
                    type="time"
                    id="time"
                    step="60"
                  />
                  {errors.time && (
                    <p className="text-destructive">{errors.time.message}</p>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="note">Note</FieldLabel>
                <Textarea 
                  {...register("note")}
                  id="textarea-message" 
                  placeholder="Morning coffee"
                />
                {errors.note && (
                  <p className="text-destructive">{errors.note.message}</p>
                )}
              </Field>
            </FieldGroup>
            {errors.root?.serverError && (
              <p className="text-destructive">{errors.root.serverError.message}</p>
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
      </FieldSet>
      <EditTransactionDialog open={openDialog} onOpenChange={setOpenDialog} onConfirm={handleConfirm} isSubmitting={isSubmitting}/>
    </Card>
  );
}