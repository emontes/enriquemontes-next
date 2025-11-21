"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaAlignRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Language from "./Language";

const Navbar = ({ toggleSidebar, data, locale }) => {
	const [isVisible, setIsVisible] = useState(true);
	const prevScrollPosRef = useRef(0);
	const [isScrolled, setIsScrolled] = useState(false);

	const pathname = usePathname();

	const isActiveLink = (url) => {
		if (!url || !pathname) return false;
		const trimmedUrl = typeof url === "string" ? url.trim() : "";
		if (!trimmedUrl) return false;
		// Normaliza quitando barras finales y asegurando que nunca quede vacío
		const normalize = (value: string) => {
			if (!value) return "/";
			const cleaned = value.replace(/\/+$/, "");
			return cleaned === "" ? "/" : cleaned;
		};

		const currentPath = normalize(pathname);
		let baseTarget = normalize(trimmedUrl);

		// Asegura que la URL objetivo esté localizada con el locale actual
		let targetPath: string;
		if (baseTarget === "/") {
			targetPath = `/${locale}`;
		} else if (baseTarget.startsWith(`/${locale}`)) {
			targetPath = baseTarget;
		} else {
			// Si viene sin locale (por ejemplo "/blog"), se lo añadimos delante
			const withoutLeadingSlash = baseTarget.replace(/^\/+/, "");
			targetPath = `/${locale}/${withoutLeadingSlash}`;
		}

		// Home: sólo cuando estamos exactamente en la home localizada o raíz
		if (targetPath === `/${locale}`) {
			return currentPath === `/${locale}` || currentPath === "/";
		}

		// Para el resto, comprobamos si la ruta actual empieza por la URL objetivo
		return currentPath.startsWith(targetPath);
	};

	useEffect(() => {
		// Set initial scroll state on client
		prevScrollPosRef.current = window.scrollY;
		setIsScrolled(window.scrollY > 0);

		let ticking = false;
		const onScroll = () => {
			const run = () => {
				const current = window.scrollY;
				const prev = prevScrollPosRef.current;
				// Show when scrolling up, hide when scrolling down, always show near top
				setIsVisible(prev > current || current < 80);
				setIsScrolled(current > 0);
				prevScrollPosRef.current = current;
				ticking = false;
			};
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(run);
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			className={`bg-white dark:bg-grey-3 w-full z-50 fixed top-0 left-0 transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			} ${isScrolled ? "shadow-md border-b-2 border-b-primary-5" : ""}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-4 sm:py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<Image
							src="/logo.svg"
							alt="Enrique Montes"
							width={236}
							height={46}
							className="h-8 w-auto sm:h-10 object-contain"
							priority
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
									className={`text-base capitalize font-medium transition duration-150 ease-in-out ${
										isActiveLink(link.LinkUrl)
											? "text-primary-6 dark:text-primary-4 border-b-2 border-primary-6 pb-1"
											: "text-grey-1 dark:text-grey-9 hover:text-grey-9"
									}`}
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
