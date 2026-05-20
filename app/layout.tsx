import type { Metadata } from "next";
import { Montserrat, Cairo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Al Nakheel Village | قرية النخيل — Al Khobar, Saudi Arabia",
  description:
    "A prestigious gated residential compound in Al Khobar, Saudi Arabia. Luxury family living with world-class amenities.",
  keywords:
    "Al Nakheel Village, قرية النخيل, Al Khobar, luxury compound, Saudi Arabia, residential, villas",
  openGraph: {
    title: "Al Nakheel Village | قرية النخيل",
    description:
      "Everything You Need. One Address. — Al Khobar's premier gated residential community.",
    siteName: "Al Nakheel Village",
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
      dir="ltr"
      className={`${montserrat.variable} ${cairo.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton phone="+966504844181" />
        </LanguageProvider>
      </body>
    </html>
  );
}
