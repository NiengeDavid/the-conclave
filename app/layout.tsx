import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Conclave 2025 – Registration",
  description: "Official registration for The Conclave 2025, Abuja.",
  openGraph: {
    title: "The Conclave 2.0 – Registration",
    description: "Official registration for The Conclave 2025, Abuja.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
