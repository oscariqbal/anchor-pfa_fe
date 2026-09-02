"use client";

// ui components
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

// APIs
import login from "@/features/auth/login"

// schemas and types
import { loginReqSchema, LoginReqType } from "@/features/auth/schema"

// others
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyFieldErrors } from "@/helpers/applyFieldErrors";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const route = useRouter();

  const {register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm<LoginReqType>({
    resolver: zodResolver(loginReqSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit (data: LoginReqType) {
    const result = await login(data)
  
    if (result.success) {
      route.replace("/overview")
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
          <FieldLegend>Sign In</FieldLegend>
          <FieldDescription>Enter your email and password below</FieldDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
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
                    ? () => toast.error(errors.root?.serverError.message, {position: "top-center"})
                    : undefined
                }>
                  {isSubmitting ? <Spinner /> : "Sign In"}
                </Button>
              </Field>
              <Field orientation="horizontal" className="flex justify-center">
                <p className="opacity-70">Didn't have an account?</p>
                <Link href="/register" className="underline opacity-90 hover:opacity-100">Sign Up</Link>
              </Field>
            </FieldGroup>
          </form>
        </FieldSet>
      </CardContent>
    </Card>
  );
}