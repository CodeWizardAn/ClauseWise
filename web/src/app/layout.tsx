import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

import { IconSprite } from "@/components/icon-sprite";
import { Toaster } from "@/components/toast";

/**
 * Typefaces come from the design system: Inter for the UI, Instrument Serif for
 * the display voice (.display/.h1/.h2 bind to --font-instrument in globals.css).
 * Geist Mono stays because the shadcn @theme block still maps --font-mono to it.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClauseWise — Understand every clause",
  description:
    "Understand what an Indian loan or rental agreement actually says, clause by clause.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${instrument.variable} ${geistMono.variable}`}
      >
        <body>
          <IconSprite />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
