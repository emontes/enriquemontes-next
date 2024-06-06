"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import esFlag from "../../public/images/flags/mx.svg";
import usFlag from "../../public/images/flags/us.svg";
import ruFlag from "../../public/images/flags/ru.svg";
import heFlag from "../../public/images/flags/il.svg";
import deFlag from "../../public/images/flags/de.svg";
import { StaticImageData } from "next/image";

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

const locales = ["en", "es", "de"];

const Language = ({locale}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};


	return (
		<div className="relative font-medium text-base" onMouseEnter={toggleOpen}
		onMouseLeave={toggleOpen}>
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
				exit={{ opacity: 1, y: -80 }}
				transition={{ duration: 0.3 }}
				className="absolute top-[-7rem] left-0 w-full bg-white border border-gray-300 rounded-md py-2 px-2 shadow-lg z-20"
			>
				{(locales as string[]).map((lng) => (
					<li key={lng}>
						<Link
							href={lng}
							locale={lng}
							passHref
							
							className={`flex items-center justify-center gap-4  rounded-md py-2 px-4 z-10 ${
								lng === locale ? "text-primary-3" : " text-primary-500"
							}`}
						>
							<img
								src={languageFlag[lng as keyof LanguageName].src}
								alt={languageName[lng as keyof LanguageName]}
								className="h-8"
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
