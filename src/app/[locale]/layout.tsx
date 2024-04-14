import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";

import {
	fetchFooterContent,
	fetchMetaData,
	fetchNavbarContent,
} from "../utils";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const NavbarData = await fetchNavbarContent(locale);
	const FooterData = await fetchFooterContent(locale);
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<main className="">
					<MainLayout
						children={children}
						NavbarData={NavbarData}
						FooterData={FooterData}
					/>
				</main>
			</body>
		</html>
	);
}
