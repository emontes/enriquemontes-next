import socialLinks from "@/constants/social_links";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = (data) => {
	return (
		<footer className="relative overflow-hidden gradient-mesh text-white">
			{/* Background overlay for better text contrast */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary-1/90 via-primary-3/80 to-primary-5/70"></div>
			
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Top section: Logo + Social */}
				<div className="flex flex-col items-center mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="mb-6"
					>
						<Image
							src="/images/logo-eama.png"
							alt="Enrique Adelino Montes Araujo (EAMA)"
							className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-xl"
							width={110}
							height={110}
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="flex space-x-4"
					>
						{socialLinks.map((link, index) => (
							<motion.a
								key={link.id}
								href={link.url}
								className="text-white/70 hover:text-white transition-all duration-300 text-2xl hover:scale-110"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
							>
								{link.icon}
							</motion.a>
						))}
					</motion.div>
				</div>

				{/* Middle section: Navigation + Copyright */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<h3 className="text-lg font-semibold mb-4 text-white/90">Navigation</h3>
						<ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
							{data.data.Column1Links?.length > 0 &&
								data.data.Column1Links.map((item) => (
									<motion.li
										key={item.id}
										whileHover={{ scale: 1.05 }}
										className="transform transition-transform duration-200"
									>
										<Link
											href={item.LinkUrl}
											className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
										>
											{item.LinkText}
										</Link>
									</motion.li>
								))}
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h3 className="text-lg font-semibold mb-4 text-white/90">About</h3>
						<p className="text-white/70 text-sm leading-relaxed">
							{data.data.copyright && data.data.copyright} &copy;{" "}
							{new Date().getFullYear()}{" "}
							<span className="text-white font-medium">
								Enrique Adelino Montes Araujo
							</span>
							{data.data.allRights && ` ${data.data.allRights}`}
						</p>
					</motion.div>
				</div>

				{/* Bottom section: Tech stack */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="pt-8 border-t border-white/20"
				>
					<div className="flex flex-col items-center space-y-4">
						<p className="text-white/60 text-sm">
							{data.data.siteMade && data.data.siteMade}
						</p>
						<div className="flex items-center space-x-3 text-white/80">
							<motion.div
								className="flex items-center space-x-1"
								whileHover={{ scale: 1.05 }}
							>
								<span className="font-medium">Strapi</span>
							</motion.div>
							<span className="text-primary-7">+</span>
							<motion.div
								className="flex items-center space-x-1"
								whileHover={{ scale: 1.05 }}
							>
								<Image src="/next.svg" alt="Next.js Logo" width={60} height={28} />
							</motion.div>
							<span className="text-primary-7">+</span>
							<motion.div
								className="flex items-center space-x-1"
								whileHover={{ scale: 1.05 }}
							>
								<span className="font-medium">n8n</span>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
