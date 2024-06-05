import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";

import {
	fetchFooterContent,
	fetchMetaData,
	fetchNavbarContent,
	fetchAllJobs,
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
		{ locale: "de" },
		// Agrega más locales según sea necesario
		// Nota es el que genera las páginas estáticas pero truena si se usa next-intl en algún page.tsx
	];
}

export async function generateMetadata({
	params: { locale },
}: { params: { locale: string } }) {
	const NavbarData = await fetchNavbarContent(locale);
	const FooterData = await fetchFooterContent(locale);
	const AllJobsData = await fetchAllJobs(locale);
	console.log(AllJobsData);

	return {
		navbar: NavbarData,
		footer: FooterData,
	};
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: LocaleLayoutProps) {
	const { navbar, footer } = await generateMetadata({ params: { locale } });
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<MainLayout
					children={children}
					NavbarData={navbar}
					FooterData={footer}
					lang={locale}
				/>
			</body>
		</html>
	);
}
