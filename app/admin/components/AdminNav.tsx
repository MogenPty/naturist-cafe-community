e client";

import { signOut } from "@/lib/auth/neon-auth";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <nav className="bg-white shadow-md border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-bold text-nature-700">
              NCC Admin
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href, item.exact)
                      ? "bg-nature-100 text-nature-700"
                      : "text-gray-600 hover:text-nature-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.name || user.email}
                </span>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-nature-500"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden py-2 border-t">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href, item.exact)
                    ? "bg-nature-100 text-nature-700"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
