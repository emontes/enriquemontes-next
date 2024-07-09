import { useMessages, useLocale } from 'next-intl';
import Image from "next/image";
import ContactForm from "./ContactForm";
import type { ContactProps } from "@/app/dynamicRendering/types";
import { HeadingText } from "@/components/HeadingText";
import { Caveat } from "next/font/google";

const caveat = Caveat({ weight: "400", subsets: ["latin"] });
export default function ContactPage({
	Heading,
	Image: ImageData,
}: ContactProps) {
	const messages = useMessages();
  	const locale = useLocale();
  
	return (
		<section className="bg-sky-50">
			<div className="flex flex-col md:flex-row">
				{ImageData?.data && (
					<div className="relative w-full md:w-1/2">
						<Image
							src={ImageData.data.attributes.url}
							alt={ImageData.data.attributes.alternativeText || "Contact image"}
							fill
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white p-4">
							<HeadingText
								attributes={{
									id: "ContactBlock",
									className: "text-2xl font-bold mb-4 capitalize",
								}}
								HeadingText={Heading.HeadingText}
								HeadingType={Heading.HeadingType}
							/>
							<p>Av. Nizuc 14 Mza 2 Lt 29 SM 17</p>
							<p>Cancún, Quintana Roo, México</p>
							<p>77505</p>
						</div>
					</div>
				)}
				<div className="w-full md:w-1/2 p-6">
				<ContactForm messages={messages} locale={locale} />
				</div>
			</div>
			<div className="bg-gray-800 text-white p-4 text-center">
				<h3 className={`text-2xl font-bold ${caveat.className}`}>Enrique Montes Araujo</h3>
			</div>
		</section>
	);
}
