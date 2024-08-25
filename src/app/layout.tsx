import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nasjp",
  description: "nasjp's website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="flex flex-col flex-grow m-4 md:m-12">
          <Header />
          <main className="flex-grow mt-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
