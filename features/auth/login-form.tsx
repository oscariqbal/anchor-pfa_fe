"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
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

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
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
    <Card className="w-80 md:w-100">
      <CardContent>
        <FieldSet>
          <FieldLegend>Sign In</FieldLegend>
          <FieldDescription>Enter your email and password below</FieldDescription>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input className="text-sm md:text-base" name="email" id="email" type="email" placeholder="john@example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input className="text-sm md:text-base" name="password" id="password" type="password" placeholder="••••••••" required />
              </Field>
              {error && (
                <div>
                  <p className="mb-4 text-red-500">{error.message}</p>
                  {error.errors && (
                    Object.entries(error.errors.field).map(([field, messages]) => (
                    <div key={field}>
                      {messages.map((message) => (
                        <p key={message} className="text-red-500">{message}</p>
                      ))}
                    </div>
                  )))}
                </div>
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