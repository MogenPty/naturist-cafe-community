import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate"; // Adjust path
import "react-big-calendar/lib/css/react-big-calendar.css";

export const metadata: Metadata = {
  title: "Naturist Cafe Community",
  description: "Official website of the Naturist Cafe Community",
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
      </body>
    </html>
  );
}
