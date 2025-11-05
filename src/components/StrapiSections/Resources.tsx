"use client";
import Image from "next/image";
import Link from "next/link";
import type { ResourcesProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "../HeadingText";
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from 'next-intl';

const getImageUrl = (url: string): string => {
  if (url.startsWith('http')) return url;
  // This runs on client, but we can use a hardcoded fallback since images should be from Cloudinary
  return url; // If not absolute, return as-is (shouldn't happen with Cloudinary)
};

interface ResourcesWrapperProps extends ResourcesProps {
  messages: any;
  locale: string;
}

const Resources = ({ messages, locale, ...props }: ResourcesWrapperProps) => {
  // If we have messages and locale, render with intl; otherwise render a non-intl fallback
  if (messages && locale) {
    return (
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ResourcesContentIntl {...props} />
      </NextIntlClientProvider>
    );
  }
  return <ResourcesBase {...props} sinceLabel={"Since"} />;
}

const ResourcesContentIntl = (props: ResourcesProps) => {
  let t;
  try {
    t = useTranslations('Resources');
  } catch (error) {
    console.warn('useTranslations failed, using fallback:', error);
    t = (key) => key; // fallback to key
  }
  return <ResourcesBase {...props} sinceLabel={t('since')} />;
};

const ResourcesBase = ({ Title, HeadingType, resources, sinceLabel }: ResourcesProps & { sinceLabel: string }) => {
  return (
    <div className="relative py-16 bg-gradient-to-br from-cyan-700 to-blue-50 clip-path-diagonal">     
      <HeadingText
        attributes={{ id: "ResourcesBlock", className: "text-white mb-8 text-center" }}
        HeadingText={Title}
        HeadingType={HeadingType}
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-6xl mx-auto px-4">
        {resources.data.map((resource) => {
          const imageUrl = resource.attributes.image?.data?.attributes?.url;
          const normalizedImageUrl = imageUrl ? getImageUrl(imageUrl) : null;
          
          const content = (
            <>
              {normalizedImageUrl && (
                <div className="w-full h-24 relative">
                  <Image
                    src={normalizedImageUrl}
                    alt={resource.attributes.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">{resource.attributes.title}</h3>
                <p className="text-gray-600 text-sm">{sinceLabel}: {resource.attributes.date}</p>
              </div>
            </>
          );

          return resource.attributes.slug ? (
            <Link 
              key={resource.id} 
              href={`/resource/${resource.attributes.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              {content}
            </Link>
          ) : (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;