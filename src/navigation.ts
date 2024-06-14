import { createSharedPathnamesNavigation } from 'next-intl/navigation';

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

export const locales = ['en', 'es', 'he', 'ru', 'de'];

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.

// export const pathnames = {
//   // If all locales use the same pathname, a
//   // single external path can be provided.
//   '/': '/',
//   '/blog': '/blog',
 
//   // If locales use different paths, you can
//   // specify each external path per locale.
//   '/about': {
//     en: '/about',
//     de: '/ueber-uns'
//   }
// } satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed'; // esta es la que hace el truco de que deje el default sin por ejemplo /en

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });