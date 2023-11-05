import { Metadata } from 'next';
import Hero from '../components/HeroHome'
import Jobs from '@/components/Jobs'

export const metadata: Metadata = {
  title:
    "Enrique Montes - Expert Programmer in Cancún | Innovative Software Solutions",
  description:
    "Connect with Enrique Montes, your premier programmer in Cancún, specializing in cutting-edge software development tailored to your business needs. Experience bespoke solutions and technological innovation with a local touch.",
};

export default function Home() {
  return (
    <>
      <Hero />

      <div className="section text-base mx-6 text-justify">
        <p className='mb-3'>
        Welcome to the professional hub of Enrique Montes, a name synonymous with programming innovation and customized tech solutions right here in the vibrant city of Cancún. With a seasoned background in software development and a palpable enthusiasm for technology, I am dedicated to helping businesses thrive in the digital realm. My approach is simple yet profound: understand the unique challenges and aspirations of each client and deliver bespoke solutions that not only meet but exceed expectations.
        </p>
        <p>
        My expertise lies in harnessing the power of modern web technologies such as <b>Next.js</b>, Gatsby, and <b>Strapi</b> to create fast, scalable, and SEO-friendly web applications. As a Next.js expert, I build server-rendered React applications that ensure lightning-fast load times and a dynamic user experience. Gatsby's robust pre-configuration enables me to develop blazing-fast websites that stand out in today's competitive digital landscape. Meanwhile, Strapi empowers me to deliver versatile, secure, and easy-to-manage back-end services for content-rich applications. Whether you're a startup or an established enterprise, my commitment is to deliver top-tier programming craftsmanship that positions your business at the forefront of innovation.
        </p>
      </div>
      
      <Jobs />
      </>
  )
}
