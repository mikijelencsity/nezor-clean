import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/Preloader";
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
    <html
      lang="hu"
      className={`${inter.variable} ${futuraCondensed.variable} h-full antialiased`}
    >
      <head>
        {/* Frissítéskor ne álljon vissza a görgetés: a preloader mindig a lap tetején (a heron) induljon. */}
        <script dangerouslySetInnerHTML={{ __html: "try{history.scrollRestoration='manual'}catch(e){}" }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Preloader />
        <RouteProgress />
        <TabTitleBlink />
        {children}
      </body>
    </html>
  );
}
