import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";

import "./globals.css";

const seriff = Noto_Serif({
  variable: "--font-seriff",
  subsets: ["latin"],
});
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
