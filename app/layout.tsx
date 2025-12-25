import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
