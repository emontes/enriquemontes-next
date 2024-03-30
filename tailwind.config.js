/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"primary-1": "var(--clr-primary-1)",
				"primary-2": "var(--clr-primary-2)",
				"primary-3": "var(--clr-primary-3)",
				"primary-4": "var(--clr-primary-4)",
				"primary-5": "var(--clr-primary-5)",
				"primary-6": "var(--clr-primary-6)",
				"primary-7": "var(--clr-primary-7)",
				"primary-8": "var(--clr-primary-8)",
				"primary-9": "var(--clr-primary-9)",
				"primary-10": "var(--clr-primary-10)",
				"grey-1": "var(--clr-grey-1)",
				"grey-3": "var(--clr-grey-3)",
				"grey-4": "var(--clr-grey-4)",
				"grey-5": "var(--clr-grey-5)",
				"grey-8": "var(--clr-grey-8)",
				"grey-9": "var(--clr-grey-9)",
				"grey-10": "var(--clr-grey-10)",
				"green-dark": "var(--clr-green-dark)",
				"red-dark": "var(--clr-red-dark)",
				"red-light": "var(--clr-red-light)",
				black: "var(--clr-black)",
				white: "var(--clr-white)",
				"white-transparency-8": "var(--clr-white-transparency-8)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
