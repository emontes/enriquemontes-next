// src/components/StrapiSections/DevelopmentsServer.tsx
import { fetchDevelopments } from "@/app/utils";
import Developments from "./Developments";
import type { DevelopmentsProps } from "@/app/dynamicRendering/types";

const DevelopmentsServer = async ({ Heading, show_all, developments, locale }: DevelopmentsProps) => {
  let displayDevelopments = developments;
  if (show_all) {
    const fetchedDevelopments = await fetchDevelopments(locale);
    displayDevelopments = { data: fetchedDevelopments };
  }
  return <Developments Heading={Heading} developments={displayDevelopments} />;
};

export default DevelopmentsServer;
