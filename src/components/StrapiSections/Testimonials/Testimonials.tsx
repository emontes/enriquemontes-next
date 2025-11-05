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
      <div className="relative z-10 py-12 w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.data.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white bg-opacity-60 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform -skew-x-6 hover:-skew-x-3 group overflow-hidden mx-2"
            >
              <div className="transform skew-x-6 group-hover:skew-x-3 transition-transform duration-300">
                {/* Contenedor de la imagen */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 overflow-hidden rounded-full">
                    {testimonial.attributes.image.data && (
                      <Image
                        src={testimonial.attributes.image.data.attributes.url}
                        alt={testimonial.attributes.name}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                        className="group-hover:opacity-90 transition-opacity duration-300"
                        sizes="(max-width: 768px) 128px, 192px"
                      />
                    )}
                  </div>
                </div>
                
                {/* Nombre */}
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium text-gray-800">
                    {testimonial.attributes.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.attributes.title}
                  </p>
                </div>
                
                {/* Texto del testimonio */}
                <div className="text-center px-2">
                  <ReactMarkdown className="text-gray-600 text-sm">
                    {testimonial.attributes.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;