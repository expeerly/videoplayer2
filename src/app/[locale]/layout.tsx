import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { Footer } from '@/src/app/components/server/Footer';
import { Sidebar } from '@/src/app/components/server/Sidebar';
import { Navbar } from '@/src/app/components/client/Navbar';
import { PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { BottomBar } from '@/src/app/components/server/BottomBar';

export const metadata: Metadata = {
  title: 'Expeerly App',
  description: 'Discover and share video reviews',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
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
            <div className="flex w-full flex-col-reverse md:flex-row">
              <Sidebar />
              <BottomBar />
              <main className="flex-1 w-full md:w-[75%] mid-lg:w-[calc(100%-275px)] relative ">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
