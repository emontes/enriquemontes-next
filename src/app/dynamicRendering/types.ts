import type { StrapiButtonType,StrapiDevelopments,StrapiHeading,
  StrapiImage,
  StrapiImageCollection,
  StrapiResources,
  StrapiTestimonials, } from "@/types";
import dynamic from "next/dynamic";
// Lazy Load All the sections
const HeroSection = dynamic(() => import('@/components/StrapiSections/HeroSection/HeroSection'))
const HeroHome = dynamic(() => import('@/components/StrapiSections/HeroHome/HeroHome'))
const SimpleParagraph = dynamic(() => import('@/components/StrapiSections/SimpleParagraph/SimpleParagraph'))
const Paragraph = dynamic(() => import('@/components/StrapiSections/Paragraph/Paragraph'))
const Jobs = dynamic(() => import('@/components/StrapiSections/Jobs'))
const Services = dynamic(() => import('@/components/StrapiSections/Services'))
const Resources = dynamic(() => import('@/components/StrapiSections/Resources'))
const Contact = dynamic(() => import('@/components/StrapiSections/Contact/Contact'))
const Testimonials = dynamic(() => import('@/components/StrapiSections/Testimonials/Testimonials'))

const StrapiComponentNames = {
  Hero: "page-sections.hero-section",
  HeroHome: "page-sections.hero-home",
  SimpleParagraph: "page-sections.simple-paragraph",
  Paragraph: "page-sections.paragraph",
  Jobs: "page-sections.jobs",
  Services: "page-sections.services",
  Resources: "page-sections.resour",
  Contact: "page-sections.contact",
  Testimonials: "page-sections.testi"
}

export const ComponentsMap = {
  [StrapiComponentNames.Hero]: HeroSection,
  [StrapiComponentNames.HeroHome]: HeroHome,
  [StrapiComponentNames.SimpleParagraph]: SimpleParagraph,
  [StrapiComponentNames.Paragraph]: Paragraph,
  [StrapiComponentNames.Jobs]: Jobs,
  [StrapiComponentNames.Services]: Services,
  [StrapiComponentNames.Resources]: Resources,
  [StrapiComponentNames.Contact]: Contact,
  [StrapiComponentNames.Testimonials]: Testimonials
};

export type HeroSectionProps = {
  __component: string;
  Heading: StrapiHeading;
  SubTitle: StrapiHeading;
  BackgroundImage: StrapiImage;
  HeroActions: StrapiButtonType[];
};

export type SimpleParagraphProps = {
  __component: string;
  Content: string;
  IsParagraphSecondary: boolean;
  DivideInParagraphs: boolean;
};

export type ParagraphProps = {
  __component: string;
  Title: string;
  Content: string;
  Images: StrapiImageCollection;
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
  show_all: boolean;
  locale: string;
};

export type ContactProps = {
  __component: string;
  Heading: StrapiHeading;
  Image: StrapiImage;
}

export type TestimonialProps = {
  __component: string;
  Background: StrapiImage;
  testimonials: StrapiTestimonials;

}