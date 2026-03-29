"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaAlignRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
			className={`w-full z-50 fixed top-0 left-0 transition-all duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			} ${isScrolled ? "glass-card shadow-card border-b border-white/20" : "bg-transparent"}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="flex justify-between items-center py-4 sm:py-5">
					<div className="flex items-center space-x-8">
						<Link href={`/${locale}`}>
							<Image
								src="/logo.svg"
								alt="Enrique Montes"
								width={236}
								height={46}
								className="h-8 w-auto sm:h-10 object-contain transition-transform hover:scale-105"
								priority
							/>
						</Link>
					</div>
					
					<div className="hidden md:flex items-center space-x-8">
						{data.HeaderLinks?.length > 0 &&
							data.HeaderLinks.map((link) => (
								<Link
									key={link.id}
									href={link.LinkUrl}
									className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
										isActiveLink(link.LinkUrl)
											? "text-primary-5"
											: "text-grey-1 hover:text-primary-5"
									}`}
								>
									{link.LinkText}
									{isActiveLink(link.LinkUrl) && (
										<motion.div
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-5 to-primary-7 rounded-full"
											layoutId="activeTab"
											initial={false}
											transition={{ type: "spring", stiffness: 300, damping: 30 }}
										/>
									)}
								</Link>
							))}
						<Language locale={locale} />
					</div>
					
					<div className="md:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-lg text-grey-1 hover:text-primary-5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-5/50 transition-all duration-200"
							onClick={toggleSidebar}
						>
							<FaAlignRight className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
