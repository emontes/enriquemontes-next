
import type { StrapiButtonType,StrapiDevelopments,StrapiHeading,
  StrapiImage,
  StrapiImageCollection,
  StrapiResources, } from "@/types";
import dynamic from "next/dynamic";
// Lazy Load All the sections
const HeroSection = dynamic(() => import('@/components/StrapiSections/HeroSection/HeroSection'))
const HeroHome = dynamic(() => import('@/components/StrapiSections/HeroHome/HeroHome'))
const SimpleParagraph = dynamic(() => import('@/components/StrapiSections/SimpleParagraph/SimpleParagraph'))
const Jobs = dynamic(() => import('@/components/StrapiSections/Jobs'))
const Services = dynamic(() => import('@/components/StrapiSections/Services'))
const Resources = dynamic(() => import('@/components/StrapiSections/Resources'))
const Developments = dynamic(() => import('@/components/StrapiSections/Developments'))
const Contact = dynamic(() => import('@/components/StrapiSections/Contact/Contact'))

const StrapiComponentNames = {
  Hero: "page-sections.hero-section",
  HeroHome: "page-sections.hero-home",
  SimpleParagraph: "page-sections.simple-paragraph",
  Jobs: "page-sections.jobs",
  Services: "page-sections.services",
  Resources: "page-sections.resour",
  Developments: "page-sections.dev",
  Contact: "page-sections.contact"
}

export const ComponentsMap = {
  [StrapiComponentNames.Hero]: HeroSection,
  [StrapiComponentNames.HeroHome]: HeroHome,
  [StrapiComponentNames.SimpleParagraph]: SimpleParagraph,
  [StrapiComponentNames.Jobs]: Jobs,
  [StrapiComponentNames.Services]: Services,
  [StrapiComponentNames.Resources]: Resources,
  [StrapiComponentNames.Developments]: Developments,
  [StrapiComponentNames.Contact]: Contact
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

export type ResourcesProps = {
  __component: string;
  Title: string;
  HeadingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  resources: StrapiResources;
};

export type DevelopmentsProps = {
  __component: string;
  Heading: StrapiHeading;
  developments: StrapiDevelopments;
};

export type ContactProps = {
  __componeny: string;
  Heading: StrapiHeading;
  Image: StrapiImage;
}