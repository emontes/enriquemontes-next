"use client";
import socialLinks from "@/constants/social_links";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = (props) => {
  return (
    <section className="relative min-h-[70vh] gradient-hero overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background Image with overlay */}
      {props.BackgroundImage.data && (
        <>
          <Image
            src={props.BackgroundImage.data.attributes.formats.medium.url}
            alt="Background Image"
            fill
            className="z-0 object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-1/80 via-primary-3/60 to-transparent z-10" />
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-20 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              className="text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-4">
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-primary-7 to-primary-9 rounded-full mx-auto lg:mx-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {props.Header1}
                </h1>
                <h3 className="text-xl sm:text-2xl text-primary-9 font-light">
                  {props.Header3}
                </h3>
                <h4 className="text-lg text-primary-8 max-w-lg mx-auto lg:mx-0">
                  {props.Header4}
                </h4>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link href={props.LinkUrl}>
                  <div className="btn">
                    {props.LinkText}
                  </div>
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex justify-center lg:justify-start space-x-6 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    className="text-white/60 hover:text-white transition-all duration-300 text-xl"
                    whileHover={{ scale: 1.2, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            {props.ProfileImage.data && (
              <motion.div 
                className="relative mx-auto lg:mx-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-5 to-primary-7 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-primary-6 to-primary-8 rounded-full"></div>
                  <div className="absolute inset-4 overflow-hidden rounded-full border-4 border-white/20">
                    <Image
                      src={props.ProfileImage.data.attributes.formats.medium.url}
                      alt="Profile Image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
