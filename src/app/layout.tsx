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
  metadataBase: new URL("https://bhumikajain.info"),
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
    url: "https://bhumikajain.info",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bhumika Jain — Software Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhumika Jain | Software Developer",
    description:
      "Full-stack Software Developer building automation-first platforms with Python, Django, React, and AI/OCR.",
    images: ["/og.png"],
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
