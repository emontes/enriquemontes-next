import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import esFlag from "../public/images/flags/mx.svg";
import usFlag from "../public/images/flags/us.svg";
import ruFlag from "../public/images/flags/ru.svg";
import heFlag from "../public/images/flags/il.svg";
import deFlag from "../public/images/flags/de.svg";
import type { StaticImageData } from "next/image";

interface LanguageFlag {
  [key: string]: StaticImageData;
}

export const languageFlag: LanguageFlag = {
  es: esFlag,
  en: usFlag,
  ru: ruFlag,
  he: heFlag,
  de: deFlag,
};


interface LanguageName {
  [key: string]: string;
}

export const languageName: LanguageName = {
  es: "Español",
  en: "English",
  ru: "русский",
  he: "עברית",
  de: "Deutsch",
};

export const routing = defineRouting({
  locales: ['en', 'es', 'he', 'ru', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // esta es la que hace el truco de que deje el default sin por ejemplo /en
});

export const locales = routing.locales;
export const localePrefix = routing.localePrefix;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);