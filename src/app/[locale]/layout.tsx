import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import {
	fetchFooterContent,
	fetchNavbarContent,
} from "../utils";

const inter = Inter({ subsets: ["latin"] });

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: { locale: string };
}

// export async function generateStaticParams() {
// 	return [
// 		{ locale: "en" },
// 		{ locale: "es" },
// 		{ locale: "he" },
// 		{ locale: "ru" },		
// 		{ locale: "de" },
// 		// Agrega más locales según sea necesario
// 		// Nota es el que genera las páginas estáticas pero truena si se usa next-intl en algún page.tsx
// 	];
// }

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
	let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
	const { navbar, footer } = await getPageData({ params: { locale } });
	return (
		<html lang={locale}>
			<body className={inter.className}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<MainLayout
					// biome-ignore lint/correctness/noChildrenProp: <explanation>
					children={children}
					NavbarData={navbar}
					FooterData={footer}
					lang={locale}
				/>
			</NextIntlClientProvider>
			</body>
		</html>
	);
}
