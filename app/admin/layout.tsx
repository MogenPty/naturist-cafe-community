import { redirect } from "next/navigation";
import { neonAuth } from "@/lib/auth/neon-auth";
import AdminNav from "./components/AdminNav";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import * as schema from "@/lib/db/schema";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const session = await neonAuth.getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  // Check if user is admin
  const admin = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.userId, session.user.id))
    .limit(1)
    .then((rows) => rows[0] ?? null);

  if (!admin) {
    redirect("/?error=Forbidden: Admin access required");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={{ email: session.user.email, name: session.user.name }} />
      <main className="container-custom py-8">
        {children}
      </main>
    </div>
  );
}
