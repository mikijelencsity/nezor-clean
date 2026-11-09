import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ConsultationWizard } from "@/components/ContactWizard";

export const metadata: Metadata = {
  title: "Ingyenes konzultáció | NEZOR",
  description:
    "Pár kérdés, és megmondjuk, miben segíthetünk. Kötelezettségmentes, 20 perces ingyenes konzultáció Facebook hirdetésekről.",
};

// Egy nézetes oldal: nincs menü és lábléc, csak egy vissza gomb; a tartalom a képernyőhöz igazodik.
export default function Konzultacio() {
  return (
    <main className="pastel-bg flex h-dvh flex-col overflow-y-auto overflow-x-hidden px-6 py-5 text-ink">
      <div className="mx-auto w-full max-w-xl lg:max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm font-semibold text-ink/70 backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          ← Vissza
        </Link>
      </div>

      <div className="my-auto py-4">
        <Suspense fallback={null}>
          <ConsultationWizard />
        </Suspense>
      </div>
    </main>
  );
}
