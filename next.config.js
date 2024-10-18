// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true, // Agregado para verificar el manejo de rutas
	images: {
		domains: ["res.cloudinary.com"],
	},
};

module.exports = withNextIntl(nextConfig);