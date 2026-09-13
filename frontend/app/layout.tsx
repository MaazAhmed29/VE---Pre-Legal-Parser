import type { Metadata } from "next";
import { Signika } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const dynamic = "force-dynamic";

const signika = Signika({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-signika",
});

export const metadata: Metadata = {
  title: "Document Legalizer",
  description:
    "Draft legal agreements with confidence. Professional document templates for NDAs, software licenses, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased ${signika.variable}`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
