import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/ui/server/Footer';
import { Sidebar } from '@/components/ui/server/Sidebar';
import { Navbar } from '@/components/ui/client/Navbar';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Expeerly App',
  description: 'Discover and share video reviews',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`h-full antialiased`}>
        <div className="flex h-full flex-col font-mulish">
          <Navbar />
          <main className="flex w-full flex-col-reverse md:flex-row">
            <Sidebar />
            <div className="flex-1 w-full md:w-[calc(100%-200px)] relative ">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
