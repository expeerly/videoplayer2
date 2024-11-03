import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Mulish,
} from "next/font/google";

// Initialize the font with the subsets and weights you want to use
export const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
