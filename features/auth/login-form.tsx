"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import login from "./login"
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const route = useRouter();
  const [error, setError] = useState<{ 
    success: boolean;
    message: string;
    errors?: {
      field: Record<string, string[]>
    }
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const result = await login(data)

    if (result.success) {
      route.replace("/dashboard");
    } else {
      setError(result)
    }
  };

  return (
    <Card className="w-100">
      <CardContent>
        <FieldSet>
          <FieldLegend>Sign In</FieldLegend>
          <FieldDescription>Enter your email and password below</FieldDescription>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" placeholder="john@example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input name="password" id="password" type="password" placeholder="••••••••" required />
                <div className="flex">
                  <div className="w-1/2 flex items-start gap-2">
                    <Input type="checkbox" id="remember" name="remember" className="border border-yellow-500 w-4 h-4"/>
                    <FieldLabel htmlFor="remember" className="text-xs">
                      Remember me
                    </FieldLabel>
                  </div>
                  <FieldLabel htmlFor="forgot-password" className="w-1/2 flex justify-end">
                    <a href="#" className="text-sm underline-offset-4 hover:underline text-xs">Forgot your password?</a>
                  </FieldLabel>
                </div>
              </Field>
              {error && (
                <>
                  <p>{error.message}</p>
                  {error.errors && (
                    Object.entries(error.errors.field).map(([field, messages]) => (
                    <div key={field}>
                      <p>{field}</p>
                      {messages.map((message) => (
                        <p key={message}>{message}</p>
                      ))}
                    </div>
                  )))}
                </>
              )}
              <Field>
                <Button type="submit" className="w-full cursor-pointer">Sign In</Button>
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