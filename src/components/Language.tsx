"use client";
import React from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

import esFlag from "../../public/images/flags/mx.svg";
import usFlag from "../../public/images/flags/us.svg";
import ruFlag from "../../public/images/flags/ru.svg";
import heFlag from "../../public/images/flags/il.svg";
import deFlag from "../../public/images/flags/de.svg";

interface LanguageName {
	[key: string]: string;
}

interface LanguageFlag {
	[key: string]: string;
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

const Language = () => {
	// const router = useRouter();
	// const { locale, locales, asPath } = router;

	return (
		<div className="relative font-medium text-base">
			{/* <div className="flex items-center justify-center gap-4 border border-gray-300 rounded-md py-2 px-4 z-10">
				<img
					src={languageFlag[locale as keyof LanguageFlag]}
					alt={languageName[locale as keyof LanguageName]}
					className="h-5"
				/>
				<span>{languageName[locale as keyof LanguageName]}</span>
			</div> */}
			<motion.ul
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="absolute top-[-7rem] left-0 w-full bg-white border border-gray-300 rounded-md py-2 px-4 shadow-lg z-20"
			>
				{(locales as string[]).map((lng) => (
					<li key={lng}>
						<Link
							href={lng}
							locale={lng}
							passHref
							className={`flex items-center gap-4 py-2 px-4 rounded-md hover:bg-primary-100 ${
								lng === "es" ? "text-primary-500" : "text-gray-700"
							}`}
						>
							<img
								src={languageFlag[lng as keyof LanguageFlag]}
								alt={languageName[lng as keyof LanguageName]}
								className="h-8"
							/>
							<span>{languageName[lng as keyof LanguageName]}</span>
						</Link>
					</li>
				))}
			</motion.ul>
		</div>
	);
};

export default Language;
