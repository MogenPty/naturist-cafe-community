import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import AgeGateEntry from "./components/AgeGateEntry";
import ErrorToastHandler from "./components/ErrorToastHandler";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./globals.css";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Naturist Café Community",
  description: "Official website of the Naturist Café Community.",
  keywords: ["naturist", "arthouse", "films", "community", "naturism"],
  openGraph: {
    title: "Naturist Café Community",
    description: "Official website of the Naturist Café Community.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AgeGateEntry>{children}</AgeGateEntry>
        <Suspense fallback={null}>
          <ErrorToastHandler />
        </Suspense>
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            duration: 5000,
            style: {
              zIndex: 999999,
            },
          }}
        />
      </body>
    </html>
  );
}
