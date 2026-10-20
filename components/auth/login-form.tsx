'use client';

import React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { login } from "@/lib/services/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type Form = {
  email: string;
  password: string;
};

type LoginFormProps = React.ComponentProps<"div">;

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  const [form, setForm] = React.useState<Form>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      await login(form);
      router.push("/admin");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="bg-white backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome back Eng: Mo
          </CardTitle>

          {/* <CardDescription>
            Login to your account
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Login with your email
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  required
                />
              </Field>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  By Mohamed Ahmed. All rights reserved.
                  {" "}© 2026
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}