import type { Metadata } from "next";
import { Libre_Baskerville, Libre_Franklin, Space_Mono } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-franklin",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Build a Ballot - Get election ready",
  description:
    "Everything you need to do your research before voting. Discover your local candidates & see how they're approaching key issues.",
  openGraph: {
    title: "Build a Ballot - Get election ready",
    description:
      "Everything you need to do your research before voting. Discover your local candidates & see how they're approaching key issues.",
    images: ["/seo/og-image.jpg"],
    type: "website",
  },
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${libreFranklin.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
