import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Toaster } from "sonner";
import ErrorToastHandler from "./components/ErrorToastHandler";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Naturist Cafe Community",
  description: "Official website of the Naturist Cafe Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout rendering with children:", !!children);
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
