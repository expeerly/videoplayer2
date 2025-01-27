import { Mulish } from 'next/font/google';

export const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
  adjustFontFallback: false,
  // Include all the weights you need
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  // Include italic if needed
  style: ['normal', 'italic'],
});
