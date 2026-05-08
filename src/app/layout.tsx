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
	title: "@rpg Sistemas",
	description: "Desenvolvendo fronteiras digitais",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/* O SEGREDO ESTÁ AQUI: suppressHydrationWarning */}
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
