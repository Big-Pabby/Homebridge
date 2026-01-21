import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNavBar } from "@/components/ConditionalNavBar";
import { Providers } from "./providers";
import Script from "next/script";

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
  openGraph: {
    title: "Homebridge - Own Property Back Home Securely",
    description:
      "Buy property and manage your investments with confidence, clarity, and complete visibility. Property investment made simple, safe, and stress-free for Nigerians abroad.",
    images: [
      {
        url: "/Graph.jpg",
        width: 1200,
        height: 630,
        alt: "Homebridge - Property Investment Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homebridge - Own Property Back Home Securely",
    description:
      "Buy property and manage your investments with confidence, clarity, and complete visibility.",
    images: ["/Graph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`}
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ConditionalNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
