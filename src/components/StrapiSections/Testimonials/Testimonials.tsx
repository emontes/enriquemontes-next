import type { TestimonialProps } from "@/app/dynamicRendering/types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Testimonials = ({ Background, testimonials }: TestimonialProps) => {
    return (
        <section className="relative py-20">
            {/* Video de fondo */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
                <video className="object-cover w-full h-full" loop autoPlay muted>
                    <source src={Background.data.attributes.url} type="video/mp4" />
                    Your browser is not supported!
                </video>
            </div>

            {/* Testimonios */}
            {testimonials.data.map((testimonial) => (
                <div key={testimonial.id} className="relative w-3/4 max-w-2xl mx-auto mb-8 bg-opacity-60 bg-gray-100 rounded shadow-lg transform -skew-x-12 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex gap-4  items-center flex-col md:flex-row p-6 transform skew-x-12">
                        {/* Imagen del testimonio */}
                        <div className="relative w-40 md:w-52 h-40 md:h-24 mr-6 overflow-hidden rounded-full">
                            <div className="absolute inset-0 rounded-full opacity-80 transition-opacity duration-300">
                                <Image
                                    src={testimonial.attributes.image.data.attributes.url}
                                    alt={testimonial.attributes.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full hover:blur"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xs uppercase opacity-0 hover:opacity-100 transition-opacity duration-300">
                                {testimonial.attributes.name}
                            </div>
                        </div>

                        {/* Texto del testimonio */}
                        <div>
                            <h4 className="mb-2 text-sm md:text-xl font-bold text-gray-700">{testimonial.attributes.title}</h4>
                       
                            <ReactMarkdown className="text-gray-500 text-xs md:text-base" children={testimonial.attributes.text} />
                        
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Testimonials;