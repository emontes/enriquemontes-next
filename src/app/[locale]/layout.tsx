"use client";
import { useState } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	return (
		<html lang={locale}>
			<body className={inter.className}>
				<main className="">
					<Navbar toggleSidebar={toggleSidebar} />
					<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
