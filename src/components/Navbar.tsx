"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaAlignRight } from "react-icons/fa";
import Link from "next/link";
import Language from "./Language";

const Navbar = ({ toggleSidebar, data, locale }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		// Set initial scroll state on client
		setIsScrolled(window.scrollY > 0);
		
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;

			setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80);
			setIsScrolled(currentScrollPos > 0);
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [prevScrollPos]);

	return (
		<div
			className={`bg-white dark:bg-grey-3 w-full z-50 transition-transform duration-300 ${
				isVisible
					? isScrolled
						? "fixed top-0 shadow-md border-b-2 border-b-primary-5"
						: ""
					: "-translate-y-full"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<Image
							src="/logo.svg"
							alt="Enrique Montes"
							width={140}
							height={56}
							className="h-6 w-auto sm:h-10 object-contain"
						/>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-primary-10 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
							onClick={toggleSidebar}
						>
							<FaAlignRight className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<nav className="hidden md:flex space-x-10">
						{data.HeaderLinks?.length > 0 &&
							data.HeaderLinks.map((link) => (
								<Link
									key={link.id}
									href={link.LinkUrl}
									className="text-base capitalize font-medium text-grey-1 dark:text-grey-9 hover:text-grey-9 transition duration-150 ease-in-out"
								>
									{link.LinkText}
								</Link>
							))}
						<Language locale={locale} />
					</nav>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
