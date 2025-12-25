import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statforge.netlify.app"), // Replace with your actual Netlify URL
  title: {
    default: "StatForge | Pro Gaming Analytics",
    template: "%s | StatForge",
  },
  description: "Deep-dive performance trackers for popular games. Analyze your performance, compare with friends, and dominate the ladder.",
  keywords: ["gaming", "analytics", "stats", "esports", "StatForge", "tracker"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "StatForge | Pro Gaming Analytics",
    description: "Deep-dive performance trackers for popular games. Analyze your performance, compare with friends, and dominate the ladder.",
    url: "https://statforge.netlify.app",
    siteName: "StatForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StatForge | Pro Gaming Analytics",
    description: "Deep-dive performance trackers for popular games. Analyze your performance, compare with friends, and dominate the ladder.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
      >
        <Navbar />
        {children}
        <footer className="border-t border-slate-800 py-8 text-center text-slate-400">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StatForge. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
