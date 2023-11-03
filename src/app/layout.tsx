"use client";
import { useState } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <html lang="en">
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
}
