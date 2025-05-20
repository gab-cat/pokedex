import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { QueryProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex - Explore the World of Pokémon",
  description:
    "A comprehensive Pokédex web application to explore and learn about different Pokémon species, their abilities, types, and stats.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
