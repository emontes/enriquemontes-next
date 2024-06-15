import React, { HtmlHTMLAttributes, MutableRefObject } from "react";
import type { StrapiHeading } from "@/types";
import ReactMarkdown from "react-markdown";

type HeadingProps = StrapiHeading & {
  attributes?: HtmlHTMLAttributes<HTMLHeadingElement>;
  Ref?: MutableRefObject<any>
};

export const HeadingText = ({ HeadingText, HeadingType, attributes, Ref }: HeadingProps) => {

  return (
    <HeadingType {...attributes} >
      <ReactMarkdown children={HeadingText} />
    </HeadingType>
  );
};
