import socialLinks from "@/constants/social_links";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar, data }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
						onClick={toggleSidebar}
					/>
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed inset-y-0 left-0 z-50 w-80 glass-dark shadow-xl"
					>
						<div className="flex items-center justify-between p-6 border-b border-white/10">
							<div className="flex items-center space-x-3">
								<div className="w-8 h-8 bg-gradient-to-br from-primary-5 to-primary-7 rounded-lg"></div>
								<span className="text-white font-medium">Menu</span>
							</div>
							<button
								type="button"
								className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
								onClick={toggleSidebar}
							>
								<FaTimes size={20} />
							</button>
						</div>
						
						<nav className="flex-1 overflow-y-auto p-6">
							<motion.ul
								initial="hidden"
								animate="visible"
								variants={{
									hidden: {},
									visible: {
										transition: {
											delayChildren: 0.1,
											staggerChildren: 0.05,
										},
									},
								}}
								className="space-y-2"
							>
								{data.HeaderLinks?.length > 0 &&
									data.HeaderLinks.map((link, index) => (
										<motion.li
											key={link.id}
											variants={{
												hidden: { x: -20, opacity: 0 },
												visible: { x: 0, opacity: 1 },
											}}
										>
											<a
												href={link.LinkUrl}
												className="block px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium capitalize"
												onClick={toggleSidebar}
											>
												{link.LinkText}
											</a>
										</motion.li>
									))}
							</motion.ul>
							
							<div className="mt-8 pt-6 border-t border-white/10">
								<p className="text-white/60 text-sm mb-4">Connect</p>
								<motion.div
									initial="hidden"
									animate="visible"
									variants={{
										hidden: {},
										visible: {
											transition: {
												delayChildren: 0.3,
												staggerChildren: 0.08,
											},
										},
									}}
									className="flex space-x-4"
								>
									{socialLinks.map((link, index) => (
										<motion.a
											key={link.id}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white/60 hover:text-white transition-all duration-300 text-xl hover:scale-110"
											variants={{
												hidden: { y: 10, opacity: 0 },
												visible: { y: 0, opacity: 1 },
											}}
										>
											{link.icon}
										</motion.a>
									))}
								</motion.div>
							</div>
						</nav>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Sidebar;
