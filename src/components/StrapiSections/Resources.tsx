import Image from "next/image";
import type { ResourcesProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "../HeadingText";

const Resources = ({ Title, HeadingType, resources }: ResourcesProps) => {
  // console.log(resources.data)
  return (
    <div className="relative py-16 bg-gradient-to-br from-cyan-700 to-blue-50 clip-path-diagonal">     
      <HeadingText
                  attributes={{ id: "ResourcesBlock", className: "text-white mb-8 text-center" }}
                  HeadingText={Title}
                  HeadingType={HeadingType}
                />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-6xl mx-auto px-4">
        {resources.data.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
            {resource.attributes.image?.data && (
              <div className="w-full h-24 relative">
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