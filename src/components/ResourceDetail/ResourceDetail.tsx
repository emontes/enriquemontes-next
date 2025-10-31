import Image from "next/image";
import Link from "next/link";

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
          };
        }>;
      };
    };
  };
}

const ResourceDetail = ({ resource }: ResourceDetailProps) => {
  const { attributes } = resource;
  
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
              Visitar sitio web
            </a>
          )}
        </div>

        {/* Main Image */}
        {attributes.image?.data?.attributes && (
          <div className="mb-12">
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

        {/* Projects using this resource */}
        {attributes.developments?.data && attributes.developments.data.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Proyectos que utilizan este recurso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attributes.developments.data.map((development) => (
                <div
                  key={development.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {development.attributes.image?.data?.attributes && (
                    <div className="mb-4">
                      <Image
                        src={development.attributes.image.data.attributes.url.startsWith('http') 
                          ? development.attributes.image.data.attributes.url 
                          : `${process.env.STRAPI_API_URL}${development.attributes.image.data.attributes.url}`}
                        alt={development.attributes.image.data.attributes.alternativeText || development.attributes.title}
                        width={development.attributes.image.data.attributes.width}
                        height={development.attributes.image.data.attributes.height}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {development.attributes.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {development.attributes.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(development.attributes.created).getFullYear()}
                    </span>
                    <Link
                      href={`/developments/${development.attributes.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver proyecto →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No projects message */}
        {(!attributes.developments?.data || attributes.developments.data.length === 0) && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              No hay proyectos registrados que utilicen este recurso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetail;
