import { AccountView } from "@neondatabase/auth/react";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <main className="container mx-auto p-6">
      <AccountView path={path} />
    </main>
  );
}
