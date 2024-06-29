import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import type { ParagraphProps } from "@/app/dynamicRendering/types";
import TitleList from "@/components/Title";

const About = ({ Title, Content, Images }: ParagraphProps) => {
	// Limita el número de imágenes a 3
	const displayedImages = Images.data.slice(0, 3);
	// const displayedImages = Images.data

	return (
        <div className="mt-20 mb-20">
        
		<div className="flex flex-col md:flex-row gap-2 md:items-center">
			<div className="p-4 text-gray-500 mb-[10rem] md:mb-2">
            <TitleList title={Title} />
				<ReactMarkdown  rehypePlugins={[rehypeRaw]}>{Content}</ReactMarkdown>
			</div>

			<div className="relative w-full max-w-sm mx-auto p-4 mb-32 md:mb-0">
				{displayedImages.map((image, index) => (
					<div
						key={image.id}
						className={`absolute transition-all duration-200 transform hover:border-4 hover:border-blue-500 hover:scale-105 hover:z-20 shadow-xl rounded ${getPhotoStyle(index)}`}
					>
						<Image
							src={image.attributes.url}
							alt={image.attributes.alternativeText}
							width={320}
							height={240}
							className="object-cover rounded"
						/>
					</div>
				))}
			</div>
		</div>
        </div>
	);
};
function getPhotoStyle(index: number) {
	switch (index) {
		case 0:
			return "top-0 left-[-0rem] border-4 border-green-500";
		case 1:
			return "top-[-10rem] left-[1rem] border-4 border-red-500";
		case 2:
			return "top-[-5rem] left-[2rem] border-4 border-yellow-500";
		default:
			return "";
	}
}

export default About;
