import NavBar from "@/components/NavBar";
import "../public/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./providers";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaceMan",
  description: "See the best Minecraft Speedrunning pace in real-time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-900 text-white text-center"}>
        <div className="top-2 left-3 absolute">
          <NavBar />
        </div>
        <div className="h-screen">
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
