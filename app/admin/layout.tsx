import {
  CalendarPlusIcon,
  FormIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldUserIcon,
  UserPenIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Script from "next/script";
import { UsersIcon } from "lucide-react";

import { auth } from "../lib/auth";
import { requireAdmin } from "../lib/session/actions";

const handleSignOut = async () => {
  "use server";
  await auth.signOut();
  redirect("/auth/login"); // Redirect after logout
};

// Force dynamic rendering since layout uses cookies via requireAdmin()
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect if:
  // - User is not logged in → /auth/login
  // - User is not admin → /?error=forbidden (toast will show)
  const { user, role } = await requireAdmin();

  return (
    <div className="min-h-screen bg-charcoal-700 flex">
      {/* Cloudinary Widget Script */}
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="afterInteractive"
      />

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
          <NavItem
            href="/admin"
            icon={<LayoutDashboardIcon />}
            label="Dashboard"
          />
          <NavItem
            href="/admin/applications"
            icon={<UserPenIcon />}
            label="Applications"
          />
          <NavItem
            href="/admin/events"
            icon={<CalendarPlusIcon />}
            label="Events"
          />
          <NavItem href="/admin/content" icon={<FormIcon />} label="Content" />
          {/* <NavItem href="/admin/gallery" icon="◫" label="Gallery" /> */}
          <NavItem
            href="/admin/board"
            icon={<UsersIcon />}
            label="Board Members"
          />
          <NavItem
            href="/admin/admins"
            icon={<ShieldUserIcon />}
            label="Admins"
          />
          <NavItem
            href="/admin/settings"
            icon={<SettingsIcon />}
            label="Settings"
          />
        </nav>

        {/* Footer */}
        {user && (
          <div className="px-4 py-4 border-t border-cream-200/10">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className="font-body text-cream-200/40 text-sm font-semibold truncate">
                  {user.name}
                </p>
                <p className="font-body text-cream-200/40 text-xs truncate">
                  {role}
                </p>
              </div>
              <Link href="#" onClick={handleSignOut}>
                <LogOutIcon />
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
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
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href} className="admin-sidebar-item">
      <span className="text-brand-gold/80 text-sm">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
