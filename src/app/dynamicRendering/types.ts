
import type { StrapiButtonType,StrapiHeading,
  StrapiImage,
  StrapiImageCollection, } from "@/types";
import dynamic from "next/dynamic";
// Lazy Load All the sections
const HeroSection = dynamic(() => import('@/components/StrapiSections/HeroSection/HeroSection'))
const HeroHome = dynamic(() => import('@/components/StrapiSections/HeroHome/HeroHome'))
const SimpleParagraph = dynamic(() => import('@/components/StrapiSections/SimpleParagraph/SimpleParagraph'))
const Jobs = dynamic(() => import('@/components/StrapiSections/Jobs'))
const Services = dynamic(() => import('@/components/StrapiSections/Services'))

const StrapiComponentNames = {
  Hero: "page-sections.hero-section",
  HeroHome: "page-sections.hero-home",
  SimpleParagraph: "page-sections.simple-paragraph",
  Jobs: "page-sections.jobs",
  Services: "page-sections.services"
}

export const ComponentsMap = {
  [StrapiComponentNames.Hero]: HeroSection,
  [StrapiComponentNames.HeroHome]: HeroHome,
  [StrapiComponentNames.SimpleParagraph]: SimpleParagraph,
  [StrapiComponentNames.Jobs]: Jobs,
  [StrapiComponentNames.Services]: Services,
};

export type HeroSectionProps = {
  __component: string;
  Heading: StrapiHeading;
  SubTitle: StrapiHeading;
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

export type JobsProps = {
  __component: string;
  Title: string;
  ShowLink: boolean;
  LinkText?: string;
  Locale: string;
  Job: {
    id: number;
    company: string;
    position: string;
    date: string;
    desc: {
      id: number;
      name: string;
    }[]
  }[]
};

export type ServicesProps = {
  __component: string;
  BackgroundImage: StrapiImage;
  Service: {
    id: number;
    icon: StrapiImage;
    title: string;
    text: string;
  }[];

}
