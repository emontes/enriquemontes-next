import React from "react";
import links from "@/constants/links";
import socialLinks from "@/constants/social_links";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<aside
			className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			<div
				className={`fixed inset-y-0 left-0 w-64 bg-grey-9 shadow-lg transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
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
					<ul className="space-y-2 px-4">
						{links.map((link, index) => (
							<li
								key={link.id}
								className={`animate-slideInLeft animate-delay-${index * 1000}`}
							>
								<a
									href={link.url}
									className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out animate-fadeInLeft"
									onClick={toggleSidebar}
								>
									{link.text}
								</a>
							</li>
						))}
					</ul>
					<div className="mt-8 px-4">
						<div className="flex justify-center space-x-4">
							{socialLinks.map((link, index) => (
								<a
									key={link.id}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out animate-bounce"
									className={`text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out animate-bounceInUp animate-delay-${
										index * 2000
									}`}
								>
									{link.icon}
								</a>
							))}
						</div>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
