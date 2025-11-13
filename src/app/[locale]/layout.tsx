import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import {
	fetchFooterContent,
	fetchNavbarContent,
} from "../utils";

const inter = Inter({ subsets: ["latin"] });

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
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
	params,
}: { params: Promise<{ locale: string }> }) {
	const {locale} = await params;
	const NavbarData = await fetchNavbarContent(locale);
	const FooterData = await fetchFooterContent(locale);
	return {
		navbar: NavbarData,
		footer: FooterData,
	};
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
    
    const {locale} = await params;
    const { navbar, footer } = await getPageData({ params: Promise.resolve({ locale }) });
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
  o.onload=function(){window.trackingFunctions.onLoad({appId:"691556f47cdb83001594924f"})},
  document.head.appendChild(o)}initApollo();`
                    }}
                />
            </head>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <MainLayout
                        children={children}
                        NavbarData={navbar}
                        FooterData={footer}
                        lang={locale}
                    />
                </NextIntlClientProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
