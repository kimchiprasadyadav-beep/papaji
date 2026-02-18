import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PapaJi 🔧 — AI Home Repair Assistant",
  description: "Ab har phone mein ek PapaJi. Take a photo of anything broken, get a step-by-step fix in seconds.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1E3A5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFF8F0] text-[#1E3A5F] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
