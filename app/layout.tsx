import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Favour Oti | Software Engineer",
  description:
    "Software engineer building production web and mobile apps across travel, hospitality, EV, and enterprise supply chain. React, Next.js, Flutter, and TypeScript.",
  keywords: [
    "Favour Oti",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Favour Oti | Software Engineer",
    description:
      "Software engineer building production web and mobile apps across travel, hospitality, EV, and enterprise supply chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
