"use client";

import { useState, type ComponentProps } from "react";
import { Roll } from "./Roll";
import { useContactWizard, WIZARD_NAME_KEY } from "./ContactWizardProvider";

// A kapcsolatfelvétel első kérdése: a nevet a kérdéssor első lépése már kitöltve kapja meg.
export function NameStartForm({ className = "", ...rest }: ComponentProps<"form">) {
  const openWizard = useContactWizard();
  const [name, setName] = useState("");

  function start(e: React.FormEvent) {
    e.preventDefault();
    const value = name.trim();
    if (!value) return;
    try {
      window.sessionStorage.setItem(WIZARD_NAME_KEY, value);
    } catch {
      // ha a böngésző tiltja a tárolást, az első lépésben újra megadja a nevét
    }
    openWizard();
  }

  return (
    <form {...rest} onSubmit={start} className={`flex w-full max-w-xl overflow-hidden rounded-full bg-[#e9e9ea] ${className}`}>
      <span aria-hidden className="flex items-center pl-5 pr-2 text-lg">
        👋
      </span>
      <input
        required
        autoComplete="given-name"
        aria-label="Hogy hívnak?"
        placeholder="Hogy hívnak?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 bg-transparent px-2 py-4 text-base text-black outline-none placeholder:text-[#6b6b6b]"
      />
      <button
        type="submit"
        className="btn-roll roll-white group flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white"
      >
        <Roll label={<>Megyek <span aria-hidden>→</span></>} hover="Mehet! →" />
      </button>
    </form>
  );
}
