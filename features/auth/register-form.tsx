"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import register from "./register";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const result = await register(data)

    if (result.success) {
      route.replace("/login");
    } else {
      setError(result)
    }
  };

  return (
    <Card className="w-100">
      <CardContent>
        <FieldSet>
          <FieldLegend>Create an Account</FieldLegend>
          <FieldDescription>Enter your name, email and password below</FieldDescription>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input name="name" id="name" type="text" placeholder="John" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" placeholder="john@example.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input name="password" id="password" type="password" placeholder="••••••••" required />
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
                <Button type="submit" className="w-full cursor-pointer">Submit</Button>
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