import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homebridge - Own Property Back Home Securely",
  description:
    "Buy property and manage your investments with confidence, clarity, and complete visibility. Property investment made simple, safe, and stress-free for Nigerians abroad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
