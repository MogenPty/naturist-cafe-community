import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import AgeGate from "./components/AgeGate";
import ErrorToastHandler from "./components/ErrorToastHandler";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AgeGate>{children}</AgeGate>
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
