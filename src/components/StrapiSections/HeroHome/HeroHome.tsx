"use client";
import socialLinks from "@/constants/social_links";
import Link from "next/link";
import Image from "next/image";

const Hero = (props) => {
  return (
    <div className="relative flex items-center justify-center h-[50vh] bg-primary-10 text-grey-8">
      {/* Background Image */}
      {props.BackgroundImage.data && (
        <Image
          src={props.BackgroundImage.data.attributes.formats.medium.url}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0 filter blur-sm"
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-1 opacity-70 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-8 sm:py-12 lg:py-8 max-w-6xl mx-auto items-center">
        {/* Text Content */}
        <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
          <div className="underline bg-black h-1 w-16 mb-4 mx-auto lg:mx-0" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{props.Header1}</h1>
          <h3 className="text-xl sm:text-2xl mt-2">{props.Header3}</h3>
          <h4 className="text-lg sm:text-xl mt-1 text-grey-5">{props.Header4}</h4>
          <Link href={props.LinkUrl}>
            <div className="mt-5 inline-block px-4 sm:px-6 py-2 bg-primary-5 text-white rounded hover:bg-primary-7 cursor-pointer">
              {props.LinkText}
            </div>
          </Link>
          {/* Social Links */}
          <div className="mt-4 flex justify-center lg:justify-start space-x-4 sm:space-x-6">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                key={link.id}
                className="text-primary-5 hover:text-primary-7 text-xl sm:text-2xl transform transition-transform duration-300 hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        {props.ProfileImage.data && (
          <div className="relative mx-auto lg:mx-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
              <Image
                src={props.ProfileImage.data.attributes.formats.medium.url}
                alt="Profile Image"
                layout="fill"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-5 to-gray-800 opacity-25 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
