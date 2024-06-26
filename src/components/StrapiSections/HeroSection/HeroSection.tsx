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
		<header className="bg-primary-10">
			<div className="hero relative h-[49vh] bg-primary-1 bg-cover bg-center">
				{BackgroundImage?.data ? (
					<div className="hero-img h-full rounded-lg">
						<Image
							src={BackgroundImage.data.attributes.url}
							role="banner"
							alt="background gradient"
							fill
							priority
						/>
					</div>
				) : (
					""
				)}
				<div className="hero-container absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgba(0,37,92,0.7)] to-[rgba(199,226,222,0.9)] rounded-lg">
					<div className="header__text-box flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
						<motion.div
							className="heading-primary text-primary-10 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] uppercase backface-hidden mb-16 font-light"
							initial={{ x: -100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<span className="heading-primary--main block text-4xl tracking-wide">
								<HeadingText
									attributes={{
										id: "HeroTitle",
										className: "heading-primary--main",
									}}
									HeadingText={Heading.HeadingText}
									HeadingType={Heading.HeadingType}
								/>
							</span>
							{SubTitle && (
								<motion.span
									className="mt-4 block tracking-wide"
									initial={{ x: 100, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.3 }}
								>
									<HeadingText
										attributes={{ id: "HeroSubTitle", className: "" }}
										HeadingText={SubTitle.HeadingText}
										HeadingType={SubTitle.HeadingType}
									/>
								</motion.span>
							)}
						</motion.div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							{HeroActions
								? HeroActions.map((props, index) => {
										// console.log("Props for item", index, ":", props);
										return (
											<motion.div
												key={props.id}
												initial={{ y: 100, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ duration: 0.5, delay: index * 0.6 }}
											>
												<Link href={`/${props.Link}`} className={`btn ${props.Primary ? '' : 'btn-secondary'}`}>
													{props.Text}
												</Link>
											</motion.div>
										);
									})
								: ""}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
