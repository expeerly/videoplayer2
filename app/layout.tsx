import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Mulish } from "next/font/google";
import { Footer } from "@/components/ui/server/Footer";
import { BottomBar } from "@/components/ui/client/BottomBar";
import { Sidebar } from "@/components/ui/server/Sidebar";
import { Navbar } from "@/components/ui/server/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "Expeerly App",
  description: "Discover and share video reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased`}
      >
        <div className=" flex flex-col h-screen overflow-hidden font-mulish">
          <Navbar />
          <main className="flex h-[calc(100%-100px)] sm:h-[calc(100%-87px)] ">
            <Sidebar />
            <div className="flex-1 relative overflow-auto h-full">
              {children}
              <Footer />
            </div>
          </main>
          <BottomBar />
        </div>
      </body>
    </html>
  );
}
