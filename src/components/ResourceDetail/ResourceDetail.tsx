import Image from "next/image";
import Link from "next/link";
import { fetchDevelopments } from "@/app/utils";
import { getTranslations } from 'next-intl/server';
import DevelopmentCard from "@/components/DevelopmentCard/DevelopmentCard";

const getImageUrl = (url: string): string => {
  if (url.startsWith('http')) return url;
  // Remove /api from STRAPI_API_URL if present
  const baseUrl = process.env.STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337';
  return `${baseUrl}${url}`;
};

interface ResourceDetailProps {
  resource: {
    id: number;
    attributes: {
      title: string;
      date: string;
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
      url?: string;
      kind: string;
      developments?: {
        data: Array<{
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
            resources?: {
              data: Array<{
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
            };
          };
        }>;
      };
    };
  };
  locale: string;
}

const ResourceDetail = async ({ resource, locale }: ResourceDetailProps) => {
  const { attributes } = resource;
  const t = await getTranslations({ locale, namespace: 'ResourceDetail' });
  
  if (!attributes) return null;

  // Fetch developments in current locale to ensure we only show projects that exist in this language
  const currentLocaleDevelopments = await fetchDevelopments(locale);
  const currentLocaleDevelopmentIds = new Set(currentLocaleDevelopments.map(d => d.id));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {attributes.kind}
            </span>
            <p className="text-lg text-gray-600">
              {formatDate(attributes.date)}
            </p>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {attributes.title}
          </h1>
          
          {attributes.url && (
            <a
              href={attributes.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('visitWebsite')}
            </a>
          )}
        </div>

        {/* Main Image */}
        {attributes.image?.data?.attributes && (
          <div className="mb-12 flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                src={getImageUrl(attributes.image.data.attributes.url)}
                alt={attributes.image.data.attributes.alternativeText || attributes.title}
                width={attributes.image.data.attributes.width}
                height={attributes.image.data.attributes.height}
                className="w-full h-full object-contain rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        )}

        {/* Projects using this resource */}
        {attributes.developments?.data && attributes.developments.data.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('projectsUsingResource')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {attributes.developments.data
                .filter((development) => {
                  // Only show developments that exist in the current locale
                  return currentLocaleDevelopmentIds.has(development.id) && 
                         development.attributes.slug && 
                         development.attributes.title;
                })
                .map((development) => (
                  <DevelopmentCard
                    key={development.id}
                    development={development}
                    locale={locale}
                    showResourceLinks={true}
                    resources={development.attributes.resources?.data || []}
                  />
                ))}
            </div>
          </div>
        )}

        {/* No projects message */}
        {(!attributes.developments?.data || attributes.developments.data.length === 0) && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              {t('noProjectsFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetail;
