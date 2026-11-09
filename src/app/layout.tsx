import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { RouteProgress } from "@/components/RouteProgress";
import { TabTitleBlink } from "@/components/TabTitleBlink";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const futuraCondensed = localFont({
  src: "../../public/fonts/FuturaLT-CondensedExtraBold.woff2",
  variable: "--font-futura-condensed",
  weight: "800",
});

export const metadata: Metadata = {
  title: "NEZOR | Facebook hirdetés, ami vevőt hoz",
  description:
    "Online rendszer, ami vevőt hoz 0–24. Weboldal, Facebook hirdetés, automatizmus, egy kézben.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Nincs betöltőképernyő: a jelzések, amikre a hero belépője, a Meta-animáció és a fejléc vár
    // (data-preloader, data-logo-landed), már az első rajzoláskor be vannak állítva, így minden azonnal indul.
    <html
      lang="hu"
      data-preloader="done"
      data-logo-landed="true"
      className={`${inter.variable} ${futuraCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <RouteProgress />
        <TabTitleBlink />
        {children}
      </body>
    </html>
  );
}
