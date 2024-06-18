import Image from "next/image";
import type { ResourcesProps } from "@/app/dynamicRendering/types";

const Resources = ({ Title, resources }: ResourcesProps) => {
  // console.log(resources.data)
  return (
    <div className="relative py-16 bg-gradient-to-br from-blue-900 to-teal-300 clip-path-diagonal">
      <h1 className="text-white text-4xl font-bold mb-8 text-center">{Title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
        {resources.data.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {resource.attributes.image && resource.attributes.image.data && (
              <div className="w-full h-36 relative">
                <Image
                  src={`${resource.attributes.image.data.attributes.url}`}
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
              <p className="text-gray-600 text-sm">{resource.attributes.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;