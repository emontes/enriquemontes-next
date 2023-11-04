import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link'
import Hero from '../components/HeroHome'

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

      <div className="">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/about"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            About{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>

        

        
      </div>
      </>
  )
}
