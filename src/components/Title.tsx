"use client";
import { motion } from "framer-motion";

const Title = ({ title }) => {
	return (
		<div className="mb-16 text-center">
			<motion.h2 
				className="text-gradient inline-block tracking-wide font-bold text-4xl sm:text-5xl lg:text-6xl"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				{title || "Default Title"}
			</motion.h2>
			<motion.div 
				className="mt-6 flex justify-center"
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, delay: 0.3 }}
			>
				<div className="w-24 h-1 bg-gradient-to-r from-primary-5 via-primary-6 to-primary-7 rounded-full shadow-glow"></div>
			</motion.div>
		</div>
	);
};

export default Title;
