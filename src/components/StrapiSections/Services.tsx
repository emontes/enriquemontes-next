"use client";
import type { ServicesProps } from "@/app/dynamicRendering/types";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { motion } from "framer-motion";

const Services = ({ BackgroundImage, Service }: ServicesProps) => {
	return (
		<section className="relative py-20 gradient-mesh">
			{/* Background Image with overlay */}
			{BackgroundImage?.data && (
				<div className="absolute inset-0 z-0">
					<Image
						src={BackgroundImage.data.attributes.url}
						alt="background gradient"
						fill
						priority
						className="object-cover opacity-20"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-primary-1/50 via-primary-3/30 to-primary-5/20"></div>
				</div>
			)}
			
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{Service.map((service, index) => {
						const { id, icon, title, text } = service;
						return (
							<motion.div
								key={id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ 
									duration: 0.6, 
									delay: index * 0.1,
									type: "spring",
									stiffness: 100
								}}
								whileHover={{ 
									y: -8,
									transition: { type: "spring", stiffness: 300 }
								}}
								className="group"
							>
								<div className="glass-card h-full p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-white/20">
									{/* Icon with glow effect */}
									{icon?.data && (
										<motion.div 
											className="relative mb-6 flex justify-center"
											whileHover={{ scale: 1.1 }}
											transition={{ type: "spring", stiffness: 400 }}
										>
											<div className="absolute inset-0 bg-gradient-to-br from-primary-5 to-primary-7 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
											<div className="relative w-20 h-20 bg-gradient-to-br from-primary-6 to-primary-8 rounded-full flex items-center justify-center">
												<Image
													src={icon.data.attributes.url}
													alt={icon.data.attributes.alternativeText || title || 'Service icon'}
													width={60}
													height={60}
													className="filter brightness-0 invert"
												/>
											</div>
										</motion.div>
									)}

									{/* Content */}
									<div className="text-center space-y-4">
										<h3 className="text-xl font-semibold text-grey-1 group-hover:text-primary-5 transition-colors duration-300">
											{title}
										</h3>
										<div className="text-grey-5 leading-relaxed">
											<ReactMarkdown>{text}</ReactMarkdown>
										</div>
									</div>

									{/* Decorative bottom line */}
									<div className="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-primary-5/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Services;
