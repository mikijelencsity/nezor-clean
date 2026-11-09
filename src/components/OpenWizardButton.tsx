"use client";

import { Roll } from "./Roll";
import { useContactWizard } from "./ContactWizardProvider";

type Tone = "dark" | "lime" | "white";

export function OpenWizardButton({
  className = "",
  children,
  hover,
  tone,
}: {
  className?: string;
  children: React.ReactNode;
  // a hoverre érkező, poénos felirat
  hover: string;
  // a gomb hoverre kitöltő színe (alapértelmezés: fekete gombnál lime, egyébként fekete)
  tone?: Tone;
}) {
  const open = useContactWizard();
  const t = tone ?? (className.includes("bg-black") ? "lime" : "dark");
  return (
    <button onClick={() => open()} className={`btn-roll roll-${t} ${className}`}>
      <Roll label={children} hover={hover} />
    </button>
  );
}
