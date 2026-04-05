import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Card, Divider } from "../../components/ui";
import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import * as schema from "../../lib/db/schema";

// Force dynamic rendering since this page uses cookies via auth.getSession()
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Check if user is authenticated and get their role
  const session = await auth.getSession();
  const user = session?.data?.user;

  if (user) {
    // Check if user is admin
    const admin = await db.query.admins.findFirst({
      where: eq(schema.admins.userId, user.id),
    });

    if (admin) {
      redirect("/admin");
    } else {
      // Non-admin users go to profile page
      redirect("/profile");
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-700 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-8">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="font-display italic font-light text-cream-100 text-3xl">
            Naturist Café
          </h1>
          <p className="font-body font-light text-cream-200/40 text-xs tracking-superwide uppercase mt-1">
            Sign In
          </p>
          <Divider className="mt-4" />
        </div>

        <div className="space-y-6">
          <p className="font-body font-light text-cream-200/60 text-sm text-center">
            Sign in to access your account
          </p>

          <a
            href="/auth/sign-in"
            className="btn-gold w-full flex items-center justify-center text-center"
          >
            Sign In
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-200/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-charcoal-600/20 text-cream-200/40 font-body font-light">
                OR
              </span>
            </div>
          </div>

          <a
            href="/auth/sign-up"
            className="btn-outline-cream w-full flex items-center justify-center text-center"
          >
            Create Account
          </a>
        </div>
      </Card>
    </div>
  );
}
