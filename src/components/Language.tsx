"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, locales, useRouter, usePathname, languageFlag, languageName } from '../navigation';

const Language = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLocale) => {
    setIsOpen(false);
    // Usar router.push con el nuevo locale
    // router.push(pathname, { locale: newLocale });
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="relative font-medium text-base" ref={buttonRef}>
      <div
        className="flex items-center justify-center gap-4 border border-gray-300 rounded-md py-2 px-4 z-10 cursor-pointer"
        onClick={toggleOpen}
      >
        <img
          src={languageFlag[locale as keyof typeof languageFlag].src}
          alt={languageName[locale as keyof typeof languageName]}
          className="h-5"
        />
        <span>{languageName[locale as keyof typeof languageName]}</span>
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
              top: `${(buttonRef.current?.offsetHeight ?? 0) + 10}px`,
            }}
          >
            {(locales as string[]).map((lng) => (
              <li key={lng}>
                <Link
                  href={pathname}
                  locale={lng}
                  passHref
                  className={`flex items-center justify-center gap-4 rounded-md py-2 px-4 z-10 hover:text-primary-4 ${
                    lng === locale ? "text-primary-3" : " text-primary-500"
                  }`}
                  onClick={() => handleLanguageChange(lng)}
                >
                  <img
                    src={languageFlag[lng as keyof typeof languageFlag].src}
                    alt={languageName[lng as keyof typeof languageName]}
                    className="h-6"
                  />
                  <span>{languageName[lng as keyof typeof languageName]}</span>
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
