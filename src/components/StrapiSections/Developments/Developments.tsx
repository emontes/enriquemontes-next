import Image from "next/image";
import { HeadingText } from "../../HeadingText";
import { FaGithub } from "react-icons/fa";

const Developments = ({ Heading, developments }) => { 
  // console.log('Developments in Developments.tsx: ',  developments)
  if (!developments || !developments.data || developments.data.length === 0) {
    return <div>No developments available.</div>;
  }
  return (
    <div className="relative py-16 bg-gradient-radial from-cyan-950 to-cyan-700 clip-path-diagonal">
      <HeadingText
        attributes={{ id: "DevelopmentsBlock", className: "text-white mb-8 text-center" }}
        HeadingText={Heading.HeadingText}
        HeadingType={Heading.HeadingType}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
        {developments.data.map((develop) => {
          const createdDate = new Date(develop.attributes.created);
          const formattedDate = createdDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
          return (
            <div key={develop.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              {develop.attributes.image && develop.attributes.image.data && (
                <div className="w-full h-44 relative">
                  <Image
                    src={`${develop.attributes.image.data.attributes.url}`}
                    alt={develop.attributes.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-300 hover:opacity-100 opacity-75"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">{develop.attributes.title}</h3>
                <p className="text-gray-500 text-sm">{develop.attributes.description}</p>
                {develop.attributes.github && (
                  <p className="text-gray-600 text-sm">
                    <a href={develop.attributes.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      <FaGithub className="inline-block" size={20} />
                    </a>
                  </p>
                )}
                {develop.attributes.url && (
                  <p className="text-gray-600 text-sm">
                    <a href={develop.attributes.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {develop.attributes.url}
                    </a>
                  </p>
                )}
                <p className="text-gray-600 text-sm">{formattedDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developments;
