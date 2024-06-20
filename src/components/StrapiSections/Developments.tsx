import Image from "next/image";
import type { DevelopmentsProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "../HeadingText";

const Developments = ({ Heading, developments }: DevelopmentsProps) => {
  console.log(Heading, developments)
  return (
    <div className="relative py-16 bg-gradient-to-br from-green-200 to-green-50 clip-path-diagonal">     
      <HeadingText
                  attributes={{ id: "DevelopmentsBlock", className: "text-white mb-8 text-center" }}
                  HeadingText={Heading.HeadingText}
                  HeadingType={Heading.HeadingType}
                />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
        {developments.data.map((develop) => (
          <div key={develop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {develop.attributes.image && develop.attributes.image.data && (
              <div className="w-full h-44 relative">
                <Image
                  src={`${develop.attributes.image.data.attributes.url}`}
                  alt={develop.attributes.title}
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
              <h3 className="text-lg font-semibold mb-1">{develop.attributes.title}</h3>
              <p className="text-gray-600 text-sm">{develop.attributes.slug}</p>
              <p className="text-gray-600 text-sm">{develop.attributes.description}</p>
              <p className="text-gray-600 text-sm">{develop.attributes.github}</p>
              <p className="text-gray-600 text-sm">{develop.attributes.url}</p>
              <p className="text-gray-600 text-sm">{develop.attributes.created.getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developments;