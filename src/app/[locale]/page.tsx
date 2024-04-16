import Hero from "@/components/HeroHome";
import Jobs from "@/components/Jobs";
import { Page } from "@/app/dynamicRendering/index";
import { localeParamType } from "@/types";

export const metadata: Metadata = {
	title:
		"Enrique Montes - Expert Programmer in Cancún | Innovative Software Solutions",
	description:
		"Connect with Enrique Montes, your premier programmer in Cancún, specializing in cutting-edge software development tailored to your business needs. Experience bespoke solutions and technological innovation with a local touch.",
};

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
	return await Page({
		params: {
			locale,
			slug: "home",
		},
	});
};
export default Home;
