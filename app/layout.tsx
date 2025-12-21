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
  metadataBase: new URL("https://thwahir.online"),
  title: {
    default: "Thwahir Pv | Full Stack Developer",
    template: "%s | Thwahir Pv"
  },
  description: "Portfolio of Thwahir Pv, a Full Stack Developer specializing in building modern web applications with Next.js, React, and Node.js.",
  keywords: ["Full Stack Developer", "Next.js", "React", "TypeScript", "Web Development", "Thwahir Pv", "Software Engineer", "Python", "Django", "Node.js"],
  authors: [{ name: "Thwahir Pv" }],
  creator: "Thwahir Pv",
  openGraph: {
    title: "Thwahir Pv | Full Stack Developer",
    description: "Portfolio of Thwahir Pv, a Full Stack Developer specializing in building modern web applications.",
    url: "https://thwahir.online",
    siteName: "Thwahir Pv Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thwahir Pv | Full Stack Developer",
    description: "Portfolio of Thwahir Pv, a Full Stack Developer specializing in building modern web applications.",
    creator: "@thwahirpv", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thwahir Pv",
  url: "https://thwahir.online",
  jobTitle: "Full Stack Developer",
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Python", "Django", "Node.js", "Web Development", "Thwahir Pv", "Software Engineer", "Python", "Django"],
  description: "Full Stack Developer specializing in modern web technologies.",
};

import SmoothScroll from "@/components/layout/SmoothScroll";
import { ToasterWithOffset } from "@/components/layout/ToasterWithOffset";

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
        <SmoothScroll>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <ToasterWithOffset />
        </SmoothScroll>
      </body>
    </html>
  );
}
