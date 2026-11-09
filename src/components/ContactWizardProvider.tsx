"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Advertised, ServicePreset } from "./ContactWizard";

// A „Hogy hívnak?” mező ide menti a nevet, hogy a kérdéssor első lépése már kitöltve várjon (URL-be nem tesszük).
export const WIZARD_NAME_KEY = "nezor-wizard-name";

export type WizardPreset = { advertised?: Advertised; service?: ServicePreset };

// A kérdéssor külön oldalon él (/konzultacio). Ez a hook oda navigál; az előválasztás attól függ, honnan indult a látogató:
// - service: "hirdetes" | "weboldal" | "webshop" esetén ez már ki van választva, "web" esetén weboldal vagy webshop közül választ,
//   üresen mindhárom közül;
// - advertised: hirdetett-e már (a főoldali „0-ról kezdjük” / „Már hirdettem” kártyákról), ez a hirdetést is kiválasztja.
export function useContactWizard() {
  const router = useRouter();
  return useCallback(
    (preset: WizardPreset = {}) => {
      const q = new URLSearchParams();
      if (preset.service) q.set("szolgaltatas", preset.service);
      if (preset.advertised) q.set("hirdetett", preset.advertised);
      const qs = q.toString();
      router.push(qs ? `/konzultacio?${qs}` : "/konzultacio");
    },
    [router],
  );
}
