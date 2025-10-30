"use client";
import { useState, useEffect } from 'react';
import type { TestimonialProps } from "@/app/dynamicRendering/types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Testimonials = ({ Background, testimonials }: TestimonialProps) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="relative py-20">
      {/* Fondo */}
      {!isMobile && Background.data && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
          <video className="object-cover w-full h-full" loop autoPlay muted playsInline>
            <source src={Background.data.attributes.url} type="video/mp4" />
            Your browser is not supported!
          </video>
        </div>
      )}

      {/* Contenedor de testimonios */}
      <div className="relative z-10">
        {testimonials.data.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative w-3/4 max-w-2xl mx-auto mb-8 bg-opacity-60 bg-gray-100 rounded shadow-lg transform -skew-x-12 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex gap-4 items-center flex-col md:flex-row p-6 transform skew-x-12">
              {/* Contenedor de la imagen y el nombre */}
              <div className="relative w-40 h-40 md:w-[24rem] md:h-[8rem] mr-6 overflow-hidden rounded-full group">
                <div className="absolute inset-0 transition-all duration-300 group-hover:blur">
                  {testimonial.attributes.image.data && (
                    <Image
                      src={testimonial.attributes.image.data.attributes.url}
                      alt={testimonial.attributes.name}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs uppercase opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-full group-hover:translate-y-0">
                  {testimonial.attributes.name}
                </div>
              </div>
              {/* Texto del testimonio */}
              <div>
                <h4 className="mb-2 text-xs md:text-xl text-gray-700">
                  {testimonial.attributes.title}
                </h4>
                <ReactMarkdown
                  className="text-gray-500"
                  children={testimonial.attributes.text}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;