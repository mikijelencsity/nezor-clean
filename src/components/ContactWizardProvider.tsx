"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Advertised } from "./ContactWizard";

// A kérdéssor külön oldalon él (/konzultacio). Ez a hook oda navigál, opcionálisan az "igen"/"nem" előválasztással.
export function useContactWizard() {
  const router = useRouter();
  return useCallback(
    (advertised?: Advertised) => {
      router.push(advertised ? `/konzultacio?hirdetett=${advertised}` : "/konzultacio");
    },
    [router],
  );
}
