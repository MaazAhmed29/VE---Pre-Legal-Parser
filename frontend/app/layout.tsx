import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pre Legal",
  description:
    "Draft legal agreements with confidence. Professional document templates for NDAs, software licenses, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
