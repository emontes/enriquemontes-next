import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
	fetchFooterContent,
	fetchNavbarContent,
} from "../utils";

const inter = Inter({ subsets: ["latin"] });

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: { locale: string };
}

export async function generateStaticParams() {
	return [
		{ locale: "en" },
		{ locale: "es" },
		{ locale: "he" },
		{ locale: "ru" },		
		{ locale: "de" },
		// Agrega más locales según sea necesario
		// Nota es el que genera las páginas estáticas pero truena si se usa next-intl en algún page.tsx
	];
}

export async function getPageData({
	params: { locale },
}: { params: { locale: string } }) {
	const NavbarData = await fetchNavbarContent(locale);
	const FooterData = await fetchFooterContent(locale);
	return {
		navbar: NavbarData,
		footer: FooterData,
	};
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: LocaleLayoutProps) {
	
	const { navbar, footer } = await getPageData({ params: { locale } });
	return (
		<html lang={locale}>
			<body className={inter.className}>
		
				<MainLayout
					children={children}
					NavbarData={navbar}
					FooterData={footer}
					lang={locale}
				/>
		
			<SpeedInsights />
			</body>
		</html>
	);
}
