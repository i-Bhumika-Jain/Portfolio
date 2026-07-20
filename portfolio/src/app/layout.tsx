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
  title: "Bhumika Jain | Software Developer",
  description:
    "Portfolio of Bhumika Jain — full-stack Software Developer building automation-first platforms with Python, Django, FastAPI, React, and AI/OCR.",
  keywords: [
    "Bhumika Jain",
    "Software Developer",
    "Full Stack Developer",
    "Python",
    "Django",
    "FastAPI",
    "React",
    "Portfolio",
  ],
  openGraph: {
    title: "Bhumika Jain | Software Developer",
    description:
      "Full-stack Software Developer building automation-first platforms with Python, Django, React, and AI/OCR.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
