"use client";
import { motion } from "framer-motion";
import type { HeroSectionProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "@/components/HeadingText";
import Image from "next/image";
import { Link } from "@/navigation";

export default function HeroSection({
	BackgroundImage,
	SubTitle,
	Heading,
	HeroActions,
}: HeroSectionProps) {
	return (
		<header className="relative overflow-hidden">
			<div className="relative h-[60vh] gradient-hero">
				{/* Background Image */}
				{BackgroundImage?.data && (
					<div className="absolute inset-0">
						<Image
							src={BackgroundImage.data.attributes.url}
							role="banner"
							alt="background gradient"
							fill
							priority
							className="object-cover opacity-30"
						/>
					</div>
				)}
				
				{/* Glassmorphism overlay */}
				<div className="absolute inset-0 glass-dark">
					<div className="absolute inset-0 bg-gradient-to-br from-primary-1/60 via-transparent to-primary-5/40"></div>
				</div>

				{/* Hero Content */}
				<div className="relative h-full flex items-center justify-center">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<motion.div
							className="space-y-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							{/* Main Title */}
							<motion.div
								className="space-y-4"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<div className="inline-block">
									<div className="w-20 h-1 bg-gradient-to-r from-primary-7 to-primary-9 rounded-full mx-auto mb-6"></div>
								</div>
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
									<HeadingText
										attributes={{
											id: "HeroTitle",
											className: "block",
										}}
										HeadingText={Heading.HeadingText}
										HeadingType={Heading.HeadingType}
									/>
								</h1>
								{SubTitle && (
									<motion.div
										className="text-xl sm:text-2xl text-primary-9 font-light max-w-2xl mx-auto"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.8, delay: 0.4 }}
									>
										<HeadingText
											attributes={{ id: "HeroSubTitle", className: "" }}
											HeadingText={SubTitle.HeadingText}
											HeadingType={SubTitle.HeadingType}
										/>
									</motion.div>
								)}
							</motion.div>

							{/* Action Buttons */}
							{HeroActions && (
								<motion.div
									className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
								>
									{HeroActions.map((props, index) => (
										<motion.div
											key={props.id}
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ 
												duration: 0.5, 
												delay: 0.8 + index * 0.15,
												type: "spring",
												stiffness: 200
											}}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.98 }}
										>
											<Link 
												href={`/${props.Link}`} 
												className={`btn ${props.Primary ? '' : 'btn-secondary'}`}
											>
												{props.Text}
											</Link>
										</motion.div>
									))}
								</motion.div>
							)}

							{/* Decorative elements */}
							<motion.div
								className="absolute top-20 left-10 w-2 h-2 bg-primary-7 rounded-full opacity-60"
								animate={{
									scale: [1, 1.5, 1],
									opacity: [0.6, 1, 0.6],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<motion.div
								className="absolute bottom-20 right-10 w-3 h-3 bg-primary-8 rounded-full opacity-40"
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.4, 0.8, 0.4],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1,
								}}
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</header>
	);
}
