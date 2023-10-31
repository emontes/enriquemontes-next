import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Enrique Montes, Programmer in Cancún - Unlocking Your Digital Potential",
  description:
    "Hello there! I'm Enrique Montes, a programmer based in Cancun. I'm ready to unlock all your digital potential. If you're in need of expert and customized programming solutions, you've come to the right place! Discover how my skills and experience can take your projects to the next level.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            <div>

    </div>
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
