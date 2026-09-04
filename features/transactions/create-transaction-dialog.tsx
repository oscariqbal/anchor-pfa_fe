'use client'

// ui components
import { Dialog, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { Field, FieldLabel, FieldGroup, FieldSet} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// APIs
import createTransaction from "@/features/transactions/create-transaction"

// schemas
import { createFormSchema, enumTransaction } from "@/features/transactions/schema";

// types
import { ViewAllType } from "@/features/wallets/schema";
import { CreateFormType } from "@/features/transactions/types";

// icons
import { ChevronDownIcon } from "lucide-react"

// others
import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext"

export default function CreateTransactionDialog({walletData}: {walletData: ViewAllType[]}) {
  const user = useUser()
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false)
  const {register, handleSubmit, control, watch, formState: {errors, isSubmitting}, setError, reset, resetField} = useForm<CreateFormType>({
    resolver: zodResolver(createFormSchema),
    mode: "onChange",
    defaultValues: {
      type: "",
      amount: 0,
      note: "",
      date: new Date(),
      time: new Date().toTimeString().slice(0, 5),
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

  async function onSubmit (data: CreateFormType) {
    const date = data.date
    const [hours, minutes] = data.time.split(":").map(Number)

    const datetime = new Date(date)
    datetime.setHours(hours, minutes, 0, 0)

    const utcDate = fromZonedTime(datetime, user.timezone)
    
    const result = await createTransaction({...data, datetime: utcDate.toISOString()})

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
          message: result.errors.general[0],
        });
      }
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create a Transaction</DialogTitle>
          <DialogDescription>Enter your transaction detail below</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldGroup className="gap-4">
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
                    <p className="text-destructive">{errors.destinationWalletId.message}</p>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input 
                  {...register("amount", {valueAsNumber: true})} 
                  name="amount" 
                  id="amount" 
                  type="amount"
                />
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer" disabled={isSubmitting} onClick={
                errors.root?.serverError
                  ? () => toast.error(errors.root?.serverError.message, {description: "Please try again", position: "top-center"})
                  : undefined
              }>
                {isSubmitting ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </FieldSet>
      </DialogContent>
    </Dialog>
  );
}