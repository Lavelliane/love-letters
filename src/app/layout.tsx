import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Love Letters",
  description: "A space for our memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${merriweather.variable}`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}