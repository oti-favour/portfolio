import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Favour Oti — Software Developer",
  description:
    "Software developer specializing in building polished, user-focused web and mobile experiences. React, Next.js, Flutter, and TypeScript.",
  keywords: [
    "Favour Oti",
    "Software Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Favour Oti — Software Developer",
    description:
      "Software developer specializing in building polished, user-focused web and mobile experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
