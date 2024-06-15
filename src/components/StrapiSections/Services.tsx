import type { ServicesProps } from "@/app/dynamicRendering/types";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const Services = ({ BackgroundImage, Service }: ServicesProps) => {
	return (

			<div className="relative py-16 bg-gradient-to-br from-blue-900 to-teal-300 clip-path-diagonal">
				{BackgroundImage?.data ? (
					<div className="absolute inset-0 z-0">
						<Image
							src={BackgroundImage.data.attributes.url}
							alt="background gradient"
							fill
							priority
							className="object-cover opacity-50"
						/>
					</div>
				) : null}
				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{Service.map((service) => {
							const { id, title, text } = service;
							return (
								<div
									key={id}
									className="rounded-lg bg-white/30 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/80"
								>
									<h3 className="text-lg font-medium text-gray-500 mb-2">
										{title}
									</h3>
									<ReactMarkdown className="text-gray-400" children={text} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		
	);
};

export default Services;
