
import { StrapiButtonType,StrapiHeading,
  StrapiImage,
  StrapiImageCollection, } from "@/types";
import dynamic from "next/dynamic";
// Lazy Load All the sections
const HeroSection = dynamic(() => import('@/components/StrapiSections/HeroSection/HeroSection'))
const HeroHome = dynamic(() => import('@/components/StrapiSections/HeroHome/HeroHome'))
const SimpleParagraph = dynamic(() => import('@/components/StrapiSections/SimpleParagraph/SimpleParagraph'))

const StrapiComponentNames = {
  Hero: "page-sections.hero-section",
  HeroHome: "page-sections.hero-home",
  SimpleParagraph: "page-sections.simple-paragraph"
}

export const ComponentsMap = {
  [StrapiComponentNames.Hero]: HeroSection,
  [StrapiComponentNames.HeroHome]: HeroHome,
  [StrapiComponentNames.SimpleParagraph]: SimpleParagraph,
};

export type HeroSectionProps = {
  __component: string;
  Heading: StrapiHeading;
  SubTitle: string;
  BackgroundImage: StrapiImage;
  HeroActions: StrapiButtonType[];
  Centered: boolean;
  HeroImage: StrapiImageCollection;
};

export type SimpleParagraphProps = {
  __component: string;
  Content: string;
  IsParagraphSecondary: boolean;
  ActionButtons?: StrapiButtonType[];
};