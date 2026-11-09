"use client";

import { Roll } from "./Roll";
import { useContactWizard, type WizardPreset } from "./ContactWizardProvider";

type Tone = "dark" | "lime" | "white";

export function OpenWizardButton({
  className = "",
  children,
  hover,
  tone,
  service,
}: {
  className?: string;
  children: React.ReactNode;
  // a hoverre érkező, poénos felirat
  hover: string;
  // a gomb hoverre kitöltő színe (alapértelmezés: fekete gombnál lime, egyébként fekete)
  tone?: Tone;
  // honnan indul a kérdéssor: ez a szolgáltatás lesz előválasztva ("web": weboldal vagy webshop közül választ)
  service?: WizardPreset["service"];
}) {
  const open = useContactWizard();
  const t = tone ?? ((className.includes("bg-black") || className.includes("bg-night")) ? "lime" : "dark");
  return (
    <button onClick={() => open({ service })} className={`btn-roll roll-${t} ${className}`}>
      <Roll label={children} hover={hover} />
    </button>
  );
}
