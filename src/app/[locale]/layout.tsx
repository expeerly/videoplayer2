import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { Footer } from '@/src/components/ui/server/Footer';
import { Sidebar } from '@/src/components/ui/server/Sidebar';
import { Navbar } from '@/src/components/ui/client/Navbar';
import { PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';

export const metadata: Metadata = {
  title: 'Expeerly App',
  description: 'Discover and share video reviews',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<PropsWithChildren<{ params: { locale: string } }>>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`h-full antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex h-full flex-col font-mulish">
            <Navbar />
            <main className="flex w-full flex-col-reverse md:flex-row">
              <Sidebar />
              <div className="flex-1 w-full md:w-[calc(100%-200px)] relative ">{children}</div>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
