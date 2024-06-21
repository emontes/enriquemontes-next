import ContactForm from './ContactForm';
import type { ContactProps } from "@/app/dynamicRendering/types"
import { HeadingText } from '@/components/HeadingText';

export default function ContactPage({Heading, Image} : ContactProps) {
  return (
    <section className="p-6  bg-sky-800">
      <HeadingText
        attributes={{ id: "ContactBlock", className: "text-2xl font-bold mb-4" }}
        HeadingText={Heading.HeadingText}
        HeadingType={Heading.HeadingType}
      />
      <ContactForm />
    </section>
  );
}