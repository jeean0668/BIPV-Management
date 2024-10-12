import type { Metadata } from "next";
import localFont from "next/font/local";
import { useState } from "react";
import "./globals.css";
// src/app/layout.tsx
import { Providers } from './providers';
import { NavWithTitle } from "@/components/organisms/navigation/NavWithTitle";
import { MdMenu } from "react-icons/md";
import LeftSidebar from "@/components/organisms/sidebar/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-row">
            
            {/* <div className="md:hidden">
              <MdMenu size={28} onClick={() => setIsMenuOpen(!isMenuOpen)} />
              </div> */}
      
              {/* <LeftSidebar></LeftSidebar> */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
