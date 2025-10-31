import Image from "next/image";

interface DevelopmentDetailProps {
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
      github?: string;
      url?: string;
      created: string;
      resources?: {
        data: Array<{
          id: number;
          attributes: {
            title: string;
            description?: string;
            url?: string;
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
          };
        }>;
      };
    };
  };
}

const DevelopmentDetail = ({ development }: DevelopmentDetailProps) => {
  const { attributes } = development;
  
  if (!attributes) return null;

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {attributes.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {formatDate(attributes.created)}
          </p>
          
          {/* Action Links */}
          <div className="flex gap-4 mb-6">
            {attributes.url && (
              <a
                href={attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver proyecto
              </a>
            )}
            {attributes.github && (
              <a
                href={attributes.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Main Image */}
        {attributes.image?.data?.attributes && (
          <div className="mb-8">
            <Image
              src={attributes.image.data.attributes.url.startsWith('http') 
                ? attributes.image.data.attributes.url 
                : `${process.env.STRAPI_API_URL}${attributes.image.data.attributes.url}`}
              alt={attributes.image.data.attributes.alternativeText || attributes.title}
              width={attributes.image.data.attributes.width}
              height={attributes.image.data.attributes.height}
              className="w-full rounded-lg shadow-lg"
              priority
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {attributes.description}
            </p>
          </div>
        </div>

        {/* Resources */}
        {attributes.resources?.data && attributes.resources.data.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recursos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attributes.resources.data.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  {resource.attributes.image?.data?.attributes && (
                    <div className="mb-4">
                      <Image
                        src={resource.attributes.image.data.attributes.url.startsWith('http') 
                          ? resource.attributes.image.data.attributes.url 
                          : `${process.env.STRAPI_API_URL}${resource.attributes.image.data.attributes.url}`}
                        alt={resource.attributes.image.data.attributes.alternativeText || resource.attributes.title}
                        width={resource.attributes.image.data.attributes.width}
                        height={resource.attributes.image.data.attributes.height}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {resource.attributes.title}
                  </h3>
                  {resource.attributes.description && (
                    <p className="text-gray-600 mb-4">
                      {resource.attributes.description}
                    </p>
                  )}
                  {resource.attributes.url && (
                    <a
                      href={resource.attributes.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver recurso →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentDetail;
