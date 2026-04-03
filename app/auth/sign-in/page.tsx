/** biome-ignore-all lint/nursery/useUniqueElementIds: Will resolve later */
"use client";

import { useActionState } from "react";
import { Button, Card, Divider, Input } from "../../components/ui";
import { signInWithEmail } from "./actions";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="min-h-screen bg-charcoal-700 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-8">
        {/* Brand header */}
        <div className="text-center mb-10">
          <h1 className="font-display italic font-light text-cream-100 text-3xl">
            Naturist Café
          </h1>
          <p className="font-body font-light text-cream-200/40 text-xs tracking-superwide uppercase mt-1">
            Create Account
          </p>
          <Divider className="mt-4" />
        </div>

        <form action={formAction} className="space-y-5">
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            required
            placeholder="john.doe@email.co.za"
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />

          {state?.error && (
            <div className="border border-red-400/30 bg-red-400/5 px-4 py-3">
              <p className="font-body font-light text-red-400 text-sm">
                {state.error}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" loading={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-body font-light text-cream-200/50 text-xs">
            Don't have an account?{" "}
            <a
              href="/auth/sign-up"
              className="text-brand-gold hover:text-earth-300 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
