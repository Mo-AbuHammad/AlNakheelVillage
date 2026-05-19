import type { Metadata } from "next";
import { Montserrat, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  title: "Al Nakheel Village | قرية النخيل — Al Khobar, Saudi Arabia",
  description:
    "A prestigious gated residential compound in Al Khobar, Saudi Arabia. Luxury family living with world-class amenities.",
  keywords:
    "Al Nakheel Village, قرية النخيل, Al Khobar, luxury compound, Saudi Arabia, residential, villas",
  openGraph: {
    title: "Al Nakheel Village | قرية النخيل",
    description:
      "A Life of Curated Elegance — Al Khobar's premier gated residential community.",
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
      className={`${montserrat.variable} ${cairo.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton phone="+966504844181" />
        </LanguageProvider>
      </body>
    </html>
  );
}
