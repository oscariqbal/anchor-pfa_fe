"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  const route = useRouter();
  const [error, setError] = useState<{ email?: string; password?: string, name?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      
      const response = await fetch("http://localhost:5555/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        route.replace("/login");
      } else {
        setError(data.error || { email: "Registration failed", password: "Registration failed", name: "Registration failed" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Card className="w-100">
      <CardContent>
        <FieldSet>
          <FieldLegend>Create an Account</FieldLegend>
          <FieldDescription>Enter your email and password below</FieldDescription>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input name="name" id="name" type="text" placeholder="John" required aria-invalid={!!error?.name} />
                {error?.name && (
                  <FieldDescription>{error.name}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email" id="email" type="email" placeholder="john@example.com" required aria-invalid={!!error?.email} />
                {error?.email && (
                  <FieldDescription>{error.email}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input name="password" id="password" type="password" placeholder="••••••••" required aria-invalid={!!error?.password} />
                {error?.password && (
                  <FieldDescription>{error.password}</FieldDescription>
                )}
              </Field>
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