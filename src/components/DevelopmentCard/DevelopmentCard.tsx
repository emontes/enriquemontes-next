import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

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

const DevelopmentCard = async ({ 
  development, 
  locale, 
  showResourceLinks = false,
  resources = [] 
}: DevelopmentCardProps) => {
  const { attributes } = development;
  const t = await getTranslations({ locale, namespace: 'DevelopmentDetail' });

  const createdDate = new Date(attributes.created);
  const formattedDate = createdDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 group">
      {attributes.image?.data?.attributes && (
        <div className="w-full h-44 relative">
          {attributes.slug ? (
            <Link href={`/${locale}/developments/${attributes.slug}`}>
              <Image
                src={attributes.image.data.attributes.url.startsWith('http') 
                  ? attributes.image.data.attributes.url 
                  : `${process.env.STRAPI_API_URL}${attributes.image.data.attributes.url}`}
                alt={attributes.image.data.attributes.alternativeText || attributes.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-opacity duration-300 hover:opacity-100 opacity-75 cursor-pointer"
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          ) : (
            <Image
              src={attributes.image.data.attributes.url.startsWith('http') 
                ? attributes.image.data.attributes.url 
                : `${process.env.STRAPI_API_URL}${attributes.image.data.attributes.url}`}
              alt={attributes.image.data.attributes.alternativeText || attributes.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 hover:opacity-100 opacity-75"
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
      )}
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-1">
          {attributes.title}
        </h3>
        <p className="text-gray-500 text-sm">
          {attributes.description}
        </p>
        {showResourceLinks && resources.length > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={`/${locale}/resource/${resource.attributes.slug || resource.documentId}`}
                className="text-blue-500 hover:underline"
                title={resource.attributes.title}
              >
                {resource.attributes.image?.data?.attributes?.formats?.thumbnail && (
                  <Image
                    src={resource.attributes.image.data.attributes.formats.thumbnail.url}
                    alt={resource.attributes.title}
                    width={20}
                    height={20}
                    className="inline-block cursor-pointer"
                  />
                )}
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {attributes.github && (
              <a
                href={attributes.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <svg className="inline-block w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
          {attributes.url && (
            <a
              href={attributes.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xs truncate max-w-[100px]"
            >
              {attributes.url}
            </a>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{formattedDate}</p>
      </div>
    </div>
  );
};

export default DevelopmentCard;
