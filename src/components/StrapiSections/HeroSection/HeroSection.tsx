import type { HeroSectionProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "@/components/HeadingText";
import Image from "next/image";
import { Link } from "@/navigation";

export default function HeroSection({ BackgroundImage, SubTitle, Heading, HeroActions, Centered, HeroImage, }: HeroSectionProps) {
  console.log("Las Hero Actions: ", HeroActions);
  return (
    <header className="bg-primary-10">
      <div className="hero relative h-[49vh] bg-primary-1 bg-cover bg-center">
        {BackgroundImage?.data ? (
          <div className="hero-img h-full rounded-lg">
            <Image src={BackgroundImage.data.attributes.url} role="banner" alt="background gradient" fill priority />
          </div>
        ) : (
          ""
        )}
        <div className="hero-container absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgba(0,37,92,0.7)] to-[rgba(199,226,222,0.9)] rounded-lg">
          <div className="header__text-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="heading-primary text-primary-10 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] uppercase backface-hidden mb-16 font-light">
              <span className="heading-primary--main block text-4xl tracking-wide animate-moveInLeft">
                <HeadingText
                  attributes={{ id: "HeroTitle", className: "heading-primary--main" }}
                  HeadingText={Heading.HeadingText}
                  HeadingType={Heading.HeadingType}
                />
              </span>
              {SubTitle && (
                <span className="heading-primary--sub mt-4 block text-2xl tracking-wide animate-moveInRight">
                  <HeadingText
                    attributes={{ id: "HeroSubTitle", className: "heading-primary--sub" }}
                    HeadingText={SubTitle.HeadingText}
                    HeadingType={SubTitle.HeadingType}
                  />
                </span>
              )}
            </h1>
            {HeroActions
              ? HeroActions.map((props) => (
                  <Link
                    key={props.id}
                    href={`/${props.Link}`}
                    className="btn btn--white btn--animated"
                  >
                    {props.Text}
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </div>
    </header>
  );
}