"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../../lib/auth/neon-auth";

interface AdminNavProps {
  user: { email: string; name?: string } | null;
}

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/board", label: "Board Members" },
  ];

  function isActive(href: string, exact?: boolean) {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

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
          <NavItem href="/admin" icon="⊞" label="Dashboard" />
          <NavItem href="/admin/applications" icon="◈" label="Applications" />
          <NavItem href="/admin/events" icon="◇" label="Events" />
          <NavItem href="/admin/content" icon="◻" label="Content" />
          <NavItem href="/admin/gallery" icon="◫" label="Gallery" />
          <NavItem href="/admin/board" icon="◯" label="Board Members" />
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-cream-200/10">
          {user && (
            <>
              <p className="font-body font-light text-cream-200/40 text-xs truncate">
                {user.email}
              </p>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-nature-500"
                >
                  Sign Out
                </button>
              </form>
            </>
          )}
          <Link
            href="/"
            className="font-body font-light text-cream-200/50 hover:text-cream-200 text-xs mt-1 block transition-colors"
          >
            ← View Site
          </Link>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
