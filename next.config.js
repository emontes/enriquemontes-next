// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true, // Agregado para verificar el manejo de rutas
	images: {
		domains: [
			"res.cloudinary.com",
			"abundant-book-6ad757f3c9.media.strapiapp.com",
		],
	},
};

module.exports = withNextIntl(nextConfig);