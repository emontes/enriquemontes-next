"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, usePathname } from "next/navigation";

import esFlag from "../../public/images/flags/mx.svg";
import usFlag from "../../public/images/flags/us.svg";
import ruFlag from "../../public/images/flags/ru.svg";
import heFlag from "../../public/images/flags/il.svg";
import deFlag from "../../public/images/flags/de.svg";
import type { StaticImageData } from "next/image";

interface LanguageName {
	[key: string]: string;
}

interface LanguageFlag {
	[key: string]: StaticImageData;
}

const languageName: LanguageName = {
	es: "Español",
	en: "English",
	ru: "русский",
	he: "עברית",
	de: "Deutsch",
};

const languageFlag: LanguageFlag = {
	es: esFlag,
	en: usFlag,
	ru: ruFlag,
	he: heFlag,
	de: deFlag,
};

const locales = ["en", "es", "he", "ru", "de"];

const Language = ({ locale }) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const params = useParams();

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	// Obtener la ruta sin el prefijo del idioma actual
	const getPathWithoutLocale = () => {
		const segments = pathname.split("/");
		const localeSegmentIndex = segments.findIndex(
			(segment) => segment === locale,
		);
		if (localeSegmentIndex !== -1) {
			segments.splice(localeSegmentIndex, 1);
		}
		return segments.join("/");
	};

	const pathWithoutLocale = getPathWithoutLocale();

	return (
		<div
			className="relative -mt-4 font-medium text-base"
			onMouseEnter={toggleOpen}
			onMouseLeave={toggleOpen}
		>
			<div className="flex items-center justify-center gap-4 border border-gray-300 rounded-md py-2 px-4 z-10">
				<img
					src={languageFlag[locale as keyof LanguageName].src}
					alt={languageName[locale as keyof LanguageName]}
					className="h-5"
				/>
				<span>{languageName[locale as keyof LanguageName]}</span>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 100 }}
						exit={{ opacity: 1, y: -110 }}
						transition={{ duration: 0.3 }}
						className="absolute top-[-7rem] left-0 w-full bg-white border border-gray-300 rounded-md py-2 px-2 shadow-lg z-20"
					>
						{(locales as string[]).map((lng) => (
							<li key={lng}>
								<Link
									href={`/${lng}${pathWithoutLocale}`}
									locale={lng}
									passHref
									className={`flex items-center justify-center gap-4  rounded-md py-2 px-4 z-10 hover:text-primary-4 ${
										lng === locale ? "text-primary-3" : " text-primary-500"
									}`}
								>
									<img
										src={languageFlag[lng as keyof LanguageName].src}
										alt={languageName[lng as keyof LanguageName]}
										className="h-6"
									/>
									<span>{languageName[lng as keyof LanguageName]}</span>
								</Link>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Language;
