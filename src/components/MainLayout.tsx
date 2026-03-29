"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const MainLayout = ({ children, NavbarData, FooterData, lang }) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Navbar toggleSidebar={toggleSidebar} data={NavbarData} locale={lang}/>
			<Sidebar
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
				data={NavbarData}
			/>
			<div className="pt-16 sm:pt-[88px]">
				{children}
			</div>
			<Footer data={FooterData} />
		</>
	);
};

export default MainLayout;
