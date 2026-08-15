"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const route = useRouter();
  const [error, setError] = useState<{ email?: string; password?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5555/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        route.replace("/dashboard");
      } else {
        setError(data.error || { email: "Login failed", password: "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
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
                <Input name="email" id="email" type="email" placeholder="john@example.com" required aria-invalid={!!error?.email} />
                {error?.email && (
                <FieldDescription>{error.email}</FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input name="password" id="password" type="password" placeholder="••••••••" required aria-invalid={!!error?.password} />
                {error?.password && (
                <FieldDescription>{error.password}</FieldDescription>
                )}
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