import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "nasjp's website",
	description: "nasjp's website",
	icons: [
		{
			url: "/favicon/android-chrome-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			url: "/favicon/android-chrome-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<div className="flex flex-col flex-grow m-4 md:m-12">
					<Header />
					<main className="flex-grow mt-4">{children}</main>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
