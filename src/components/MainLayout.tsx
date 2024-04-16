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
			<Navbar toggleSidebar={toggleSidebar} data={NavbarData} />
			<Sidebar
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
				data={NavbarData}
			/>
			{children}
			<Footer data={FooterData} />
		</>
	);
};

export default MainLayout;
