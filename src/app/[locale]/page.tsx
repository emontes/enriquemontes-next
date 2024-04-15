// import { useTranslations } from "next-intl";
import { Metadata } from "next";
import Hero from "@/components/HeroHome";
import Jobs from "@/components/Jobs";

export const metadata: Metadata = {
	title:
		"Enrique Montes - Expert Programmer in Cancún | Innovative Software Solutions",
	description:
		"Connect with Enrique Montes, your premier programmer in Cancún, specializing in cutting-edge software development tailored to your business needs. Experience bespoke solutions and technological innovation with a local touch.",
};

export default function Home() {
	// const t = useTranslations("Index");
	return (
		<>
			<Hero />

			<div className="section text-base mx-6 text-justify">
				{/* <p className="mb-3">{t("textHome")}</p> */}
				Home
			</div>

			<Jobs jobs={[]} showLink={true} />
		</>
	);
}
