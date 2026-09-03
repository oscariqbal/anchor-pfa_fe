"use client";

// ui components
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

// APIs
import regist from "@/features/auth/register";

// schemas
import { registerReqSchema } from "@/features/auth/schema"

// types
import { RegisterReqType } from "@/features/auth/types";

// others
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const route = useRouter();

  const {register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm<RegisterReqType>({
    resolver: zodResolver(registerReqSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  async function onSubmit (data: RegisterReqType) {
    const result = await regist(data)
  
    if (result.success) {
      route.replace("/login")
    } else {
      if (result.errors.field) {
        applyFieldErrors(result.errors.field, setError) // type assertion issue here
      }
      if (result.errors.general) {
        setError("root.serverError", {
          message: result.errors.general[0],
        })
      }
    }
  }

  return (
    <Card className="w-100 bg-transparent border-none shadow-none ring-0">
      <CardContent>
        <FieldSet>
          <FieldLegend>Create an Account</FieldLegend>
          <FieldDescription>Enter your name, email and password below</FieldDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...register("name")} name="name" id="name" type="name" placeholder="John" />
                {errors.name && (
                  <p className="text-red-400">{errors.name.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...register("email")} name="email" id="email" type="email" placeholder="john@example.com" />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input {...register("password")} name="password" id="password" type="password" placeholder="••••••••"/>
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}
              </Field>
              <Field>
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting} onClick={
                  errors.root?.serverError
                    ? () => toast.error(errors.root?.serverError.message, {description: "Please try again", position: "top-center"})
                    : undefined
                }>
                  {isSubmitting ? <Spinner /> : "Sign In"}
                </Button>
              </Field>
              <Field orientation="horizontal" className="flex justify-center">
                <p className="opacity-70">Already have an account?</p>
                <Link href="/login" className="underline opacity-90 hover:opacity-100">Sign In</Link>
              </Field>
            </FieldGroup>
          </form>
        </FieldSet>
      </CardContent>
    </Card>
  );
}