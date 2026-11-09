import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CasesExplorer } from "@/components/CasesExplorer";

export const metadata: Metadata = {
  title: "Esettanulmányok | NEZOR",
  description:
    "Valódi cégek, valódi Meta hirdetési eredmények: ajánlatkérések és időpontfoglalások, számokkal.",
};

export default function Esettanulmanyok() {
  return (
    <>
      <Header />
      <main>
        <CasesExplorer />
      </main>
      <Footer />
    </>
  );
}
