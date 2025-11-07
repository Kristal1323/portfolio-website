import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Kristal Sin — Portfolio",
  description: "Software Engineer | Terminal-style interactive portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-black text-green-400`}>{children}</body>
    </html>
  );
}
