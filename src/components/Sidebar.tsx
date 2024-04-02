import links from "@/constants/links";
import socialLinks from "@/constants/social_links";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.aside
					initial={{ x: "-100%" }}
					animate={{ x: 0 }}
					exit={{ x: "-100%" }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
				>
					<div className="fixed inset-y-0 left-0 w-64 bg-gray-100 shadow-lg">
						<div className="flex justify-end px-4 py-3">
							<button
								type="button"
								className="text-red-700 hover:text-red-900 focus:outline-none"
								onClick={toggleSidebar}
							>
								<FaTimes size={24} />
							</button>
						</div>
						<nav>
							<motion.ul
								initial="hidden"
								animate="visible"
								variants={{
									hidden: {},
									visible: {
										transition: {
											delayChildren: 0.3,
											staggerChildren: 0.1,
										},
									},
								}}
								className="space-y-2 px-4"
							>
								{links.map((link, index) => (
									<motion.li
										key={link.id}
										variants={{
											hidden: { x: "-100%", opacity: 0 },
											visible: { x: 0, opacity: 1 },
										}}
									>
										<a
											href={link.url}
											className="capitalize block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition duration-150 ease-in-out"
											onClick={toggleSidebar}
										>
											{link.text}
										</a>
									</motion.li>
								))}
							</motion.ul>
							<div className="mt-8 px-4 list-none">
								<motion.div
									initial="hidden"
									animate="visible"
									variants={{
										hidden: {},
										visible: {
											transition: {
												delayChildren: 0.6,
												staggerChildren: 0.1,
											},
										},
									}}
									className="flex justify-center space-x-4"
								>
									{socialLinks.map((link, index) => (
										<motion.li
											key={link.id}
											variants={{
												hidden: { y: 100, opacity: 0 },
												visible: { y: 0, opacity: 1 },
											}}
										>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary-7 dark:text-primary-6 hover:text-grey-8 transition-all duration-300 text-2xl hover:-translate-y-4"
											>
												{link.icon}
											</a>
										</motion.li>
									))}
								</motion.div>
							</div>
						</nav>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};

export default Sidebar;
