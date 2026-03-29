"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface DevelopmentCardProps {
  development: {
    id: number;
    attributes: {
      title: string;
      slug: string;
      description: string;
      image?: {
        data?: {
          attributes: {
            url: string;
            alternativeText?: string;
            width: number;
            height: number;
          };
        };
      };
      created: string;
      url?: string;
      github?: string;
    };
  };
  locale: string;
  showResourceLinks?: boolean;
  resources?: Array<{
    id: number;
    attributes: {
      title: string;
      slug?: string;
      image?: {
        data?: {
          attributes: {
            formats?: {
              thumbnail?: {
                url: string;
              };
            };
          };
        };
      };
    };
    documentId: string;
  }>;
}

const getImageUrl = (url: string): string => {
  if (url.startsWith('http')) return url;
  // Remove /api from STRAPI_API_URL if present
  const baseUrl = process.env.STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  return `${baseUrl}${url}`;
};

const DevelopmentCard = ({ 
  development, 
  locale, 
  showResourceLinks = false,
  resources = [] 
}: DevelopmentCardProps) => {
  const { attributes } = development;
  const t = useTranslations('DevelopmentDetail');

  const createdDate = new Date(attributes.created);
  const formattedDate = createdDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

	const maxDescriptionLength = 260;
	const rawDescription = attributes.description || "";
	const truncatedDescription =
		rawDescription.length > maxDescriptionLength
			? `${rawDescription.slice(0, maxDescriptionLength).trimEnd()}...`
			: rawDescription;

  return (
    <motion.div
      className="glass-card group h-full overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      {/* Image Section */}
      {attributes.image?.data?.attributes && (
        <div className="relative h-48 overflow-hidden">
          {attributes.slug ? (
            <Link href={`/${locale}/developments/${attributes.slug}`}>
              <div className="relative w-full h-full">
                <Image
                  src={getImageUrl(attributes.image.data.attributes.url)}
                  alt={attributes.image.data.attributes.alternativeText || attributes.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">View Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Image
              src={getImageUrl(attributes.image.data.attributes.url)}
              alt={attributes.image.data.attributes.alternativeText || attributes.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold text-grey-1 group-hover:text-primary-5 transition-colors duration-300 line-clamp-2">
          {attributes.title}
        </h3>

        {/* Description */}
        <p className="text-grey-5 text-sm leading-relaxed line-clamp-3">
          {truncatedDescription}
        </p>

        {/* Resource Links */}
        {showResourceLinks && resources.length > 0 && (
          <div className="pt-3 border-t border-white/20">
            <p className="text-xs text-grey-5 mb-2">Related Resources</p>
            <div className="flex flex-wrap gap-2">
              {resources.slice(0, 4).map((resource) => {
                const rawThumb = resource.attributes.image?.data?.attributes?.formats?.thumbnail?.url;
                const thumbUrl = rawThumb ? getImageUrl(rawThumb) : undefined;
                return resource.attributes.slug && thumbUrl ? (
                  <Link
                    key={resource.id}
                    href={`/${locale}/resource/${resource.attributes.slug}`}
                    className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 hover:border-primary-5/50 transition-all duration-200"
                    title={resource.attributes.title}
                  >
                    <Image
                      src={thumbUrl}
                      alt={resource.attributes.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Footer with links and date */}
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div className="flex items-center space-x-3">
            {attributes.github && (
              <a
                href={attributes.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-5 hover:text-primary-5 transition-colors duration-200"
                title="View on GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {attributes.url && (
              <a
                href={attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-5 hover:text-primary-5 transition-colors duration-200 text-xs truncate max-w-[100px]"
                title="Visit Live Site"
              >
                Live Demo
              </a>
            )}
          </div>
          <p className="text-xs text-grey-5">{formattedDate}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DevelopmentCard;
