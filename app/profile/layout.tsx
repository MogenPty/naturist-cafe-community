import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";

const handleSignOut = async () => {
  "use server";
  await auth.signOut();
  redirect("/auth/login"); // Redirect after logout
};

// Force dynamic rendering since layout uses cookies via requireAdmin()
export const dynamic = "force-dynamic";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await auth.getSession();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-charcoal-700 flex">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-60 shrink-0 bg-charcoal-600/50 border-r border-cream-200/10 flex flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-cream-200/10">
          <p className="font-display italic text-cream-100 text-lg">
            Naturist Café
          </p>
          <p className="font-body font-light text-cream-200/40 text-[10px] tracking-superwide uppercase">
            Admin Console
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          <NavItem href="/profile" icon="⊞" label="Profile" />
        </nav>

        {/* Footer */}
        {user && (
          <div className="px-4 py-4 border-t border-cream-200/10">
            <div className="flex flex-row items-center justify-between">
              <p className="font-body font-light text-cream-200/40 text-xs truncate">
                {user.name}
              </p>
              <div className="flex flex-row items-center gap-2">
                <Link href="#" onClick={handleSignOut}>
                  <LogOutIcon />
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main className="flex-1 overflow-auto pt-0!">
        <div className="max-w-7xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link href={href} className="admin-sidebar-item">
      <span className="text-brand-gold/80 text-sm">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
