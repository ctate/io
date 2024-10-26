import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const font = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IO - Information Overload",
  description: "Copy and paste entire docs in one click!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
