import socialLinks from "@/app/constants/social_links";
import Image from "next/image";
import links from "@/app/constants/links-footer";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-grey-1 text-grey-10 dark:bg-grey-10 dark:text-grey-1 py-16">
			<div className="flex flex-col items-center mb-16">
				<Image
					src="/images/logo-eama.png"
					alt="Enrique Adelino Montes Araujo (EAMA)"
					className="w-28 h-28"
					width={110}
					height={110}
				/>

				<div className="mt-8 flex space-x-4">
					{socialLinks.map((link) => {
						return (
							<a
								href={link.url}
								key={link.id}
								className="text-primary-7 dark:text-primary-6 hover:text-grey-8 transition-all duration-300 text-4xl hover:-translate-y-4"
							>
								{link.icon}
							</a>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="navigation mb-8 md:mb-0 px-4">
					<div className="underline" />
					<ul className="flex flex-wrap">
						{links.map((item) => {
							return (
								<li
									key={item.url}
									className="mr-6 mb-4 hover:rotate-[-5deg] hover:scale-110 transition-all duration-300"
								>
									<Link
										href={item.url}
										className="uppercase  hover:text-primary-5  hover:scale-75 transition-all duration-300"
									>
										{item.text}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="copy px-4">
					<div className="underline" />
					<p className="capitalize">
						copyright &copy; {new Date().getFullYear()}{" "}
						<span className=" text-primary-5">
							Enrique Adelino Montes Araujo
						</span>{" "}
						all rights reserved
					</p>
				</div>
			</div>

			<div className="mt-12 flex items-center justify-center text-3xl">
				Site made with:
				<Image
					className="relative ml-6 invert dark:invert-0 drop-shadow-[0_0_0.3rem_#ffffff70] animate-bounce"
					src="/next.svg"
					alt="Next.js Logo"
					width={80}
					height={37}
				/>
			</div>
		</footer>
	);
};

export default Footer;
