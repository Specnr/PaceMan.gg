import NavBar from "@/components/NavBar";
import "../public/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ModalProvider } from "./context/ModalContext";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./providers";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaceMan",
  description: "See the best Minecraft Speedrunning pace in real-time",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-950 text-white h-full flex flex-col`}>
        <Providers>
          <ModalProvider>
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-md">
                <div className="mx-auto px-4 py-3 flex justify-between items-center">
                  <NavBar />
                </div>
              </header>

              <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
                {children}
              </main>

              <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-4 mt-auto">
                <div className="container mx-auto px-4">
                  <Footer />
                </div>
              </footer>
            </div>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
