import { UserButton } from "@neondatabase/auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b p-4">
        <h1 className="text-xl font-bold">My App</h1>
        <UserButton size="icon" /> {/* Opens account menu */}
      </header>
      {children}
    </>
  );
}
