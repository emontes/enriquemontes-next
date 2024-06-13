"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const buttonRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = () => {
    setIsOpen(false);
  };


  return (
    <div className="relative font-medium text-base" ref={buttonRef}>
      <div
        className="flex items-center justify-center gap-4 border border-gray-300 rounded-md py-2 px-4 z-10 cursor-pointer"
        onClick={toggleOpen}
      >
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-full bg-white border border-gray-300 rounded-md py-2 px-2 shadow-lg z-20"
            style={{
              top: `${buttonRef.current?.offsetHeight + 10}px`,
            }}
          >
            {(locales as string[]).map((lng) => (
              <li key={lng}>
                <Link
                  href={`/${lng}`}
                  locale={lng}
                  passHref
                  className={`flex items-center justify-center gap-4  rounded-md py-2 px-4 z-10 hover:text-primary-4 ${
                    lng === locale ? "text-primary-3" : " text-primary-500"
                  }`}
                  onClick={handleLanguageChange}
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
