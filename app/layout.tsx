import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { mulish } from "@/config/fonts";
import { Navbar } from "@/components/client/Navbar";
import Sidebar from "@/components/client/Sidebar";
import { BottomBar } from "@/components/client/BottomBar";
import Footer from "@/components/server/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-mulish antialiased",
          mulish.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen overflow-hidden">
            <Navbar />
            <main className="flex h-full">
              <Sidebar />
              <div className="flex-1 relative overflow-auto h-[calc(100%-135px)] sm:h-[calc(100%-65px)]">
                {children}
              </div>
            </main>
            <Footer />
            <BottomBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
