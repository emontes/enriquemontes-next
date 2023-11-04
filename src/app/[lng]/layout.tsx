"use client"

import { useState } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import { dir } from 'i18next'; // Importar dir de i18next
import { languages } from "../i18n/settings";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const inter = Inter({ subsets: ["latin"] });

// Define una interfaz para las props de RootLayout
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lng: string; // lng es un string requerido dentro de un objeto params
  };
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { lng }, // Extraer lng de params
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang={lng} dir={dir(lng)}> {/* Utilizar lng para el atributo lang y dir */}
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <main className="">
            <Navbar toggleSidebar={toggleSidebar} />
            {children}
            <Footer />
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
