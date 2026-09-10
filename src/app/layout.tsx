import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
	themeColor: "#080a0f",
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	title: "@rpg Sistemas | Engenharia de Software & Soluções Corporativas",
	description:
		"Desenvolvimento de software sob medida, sistemas de gestão operacional (G.O.S), CRMs corporativos e aplicações mobile-first com arquitetura moderna e escalável.",
	keywords: [
		"desenvolvimento de software",
		"software sob medida",
		"sistema de ordem de serviço",
		"crm personalizado",
		"arquitetura node typescript",
		"laravel vue",
		"aplicações corporativas",
		"rpg sistemas",
	],
	authors: [{ name: "RPG Sistemas" }],
	creator: "RPG Sistemas",
	publisher: "RPG SISTEMAS E ASSESSORIA ADMINISTRATIVA LTDA",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: "https://rpgsistemas.com.br",
		title: "@rpg Sistemas | Engenharia de Software Sob Medida",
		description:
			"Transformamos regras de negócio complexas em software robusto e de alta performance. Conheça nossos sistemas e metodologias.",
		siteName: "RPG Sistemas",
	},
	twitter: {
		card: "summary_large_image",
		title: "@rpg Sistemas | Engenharia de Software Sob Medida",
		description:
			"Sistemas de gestão, CRMs e plataformas web de alta performance para a sua empresa.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-[#080a0f] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300`}
			>
				{children}
			</body>
		</html>
	);
}
