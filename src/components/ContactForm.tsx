"use client";

import { useState } from "react";
import { Halo } from "./Halo";
import { Roll } from "./Roll";

// A Kapcsolat oldal rövid űrlapja: elérhetőség, és hogy miben segítsünk (hirdetés, weboldal, webshop).
// Ugyanoda küld, mint a konzultációs kérdéssor (/api/contact).
const PRIVACY_URL = "https://www.nezor.hu/adatkezeles";

const TOPICS = [
  { label: "Hirdetések", desc: "kevés a megkeresés" },
  { label: "Weboldal", desc: "nincs, vagy nem hoz ügyfelet" },
  { label: "Webshop", desc: "online adnék el" },
];

const field =
  "w-full rounded-2xl border border-black/10 bg-white/90 px-5 py-4 text-base text-ink placeholder:text-ink/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15";

export function ContactForm({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  // egy kötelező pipa: adatkezelési tájékoztató, e-mailes ajánlat és Meta-mérés együtt
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          answers: {
            szolgaltatas: topics.length ? topics.join(", ") : "Nem jelölte",
            kiindulas: "Kapcsolat oldal",
            ...(message.trim() ? { leiras: message.trim() } : {}),
            hozzajarulas: consent ? "igen" : "nem",
          },
        }),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className={`${className} flex flex-col items-center justify-center gap-3 text-center`}>
        <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
          ✓
        </span>
        <h2 className="font-display relative text-3xl sm:text-4xl">KÖSZÖNJÜK!</h2>
        <p className="relative max-w-sm text-ink/70">24 órán belül hívunk, és átbeszéljük, miben tudunk segíteni.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${className} flex flex-col gap-4`}>
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#ffd6b8]/40 blur-3xl" />
      <h2 className="font-display relative text-3xl sm:text-4xl">KÉREK EGY RÖVID KONZULTÁCIÓT</h2>
      <p className="relative -mt-1 mb-2 text-sm text-ink/60">Pár adat, és már jelentkezünk.</p>

      <fieldset className="relative">
        <legend className="mb-2 text-sm font-semibold">Miben segítsünk? (többet is választhatsz)</legend>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
          {TOPICS.map((t) => {
            const on = topics.includes(t.label);
            return (
              <button
                key={t.label}
                type="button"
                aria-pressed={on}
                onClick={() => setTopics((list) => (on ? list.filter((x) => x !== t.label) : [...list, t.label]))}
                className={`min-w-0 rounded-2xl border-2 px-2 py-3 text-center transition-colors ${
                  on ? "border-accent bg-accent text-white" : "border-black/10 bg-white/90 hover:border-accent"
                }`}
              >
                <span className="block text-sm font-bold sm:text-base">{t.label}</span>
                <span className={`mt-0.5 block text-xs leading-tight ${on ? "text-white/85" : "text-ink/55"}`}>{t.desc}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <input type="text" required autoComplete="name" placeholder="Neved *" value={name} onChange={(e) => setName(e.target.value)} className={`${field} relative`} />
      <input type="email" required autoComplete="email" placeholder="E-mail címed *" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} relative`} />
      <input type="tel" required autoComplete="tel" placeholder="Telefonszámod *" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${field} relative`} />
      <textarea
        rows={3}
        placeholder="Röviden: mi a gond? (nem kötelező)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${field} relative`}
      />

      <label className="relative flex items-start gap-3 text-xs leading-relaxed text-ink/60">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-6 w-6 shrink-0 accent-accent"
        />
        <span>
          Elfogadom az{" "}
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline">
            Adatkezelési tájékoztatót
          </a>
          , az e-mailes ajánlatokat és a Meta-mérést. *
        </span>
      </label>

      {state === "error" && (
        <p role="alert" className="relative text-sm text-red-600">
          Nem sikerült elküldeni. Próbáld újra, vagy írj az info@nezor.hu címre.
        </p>
      )}

      <div className="relative mt-2 flex justify-center">
        <Halo>
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn-roll roll-dark rounded-full bg-accent px-9 py-4 text-base font-semibold text-white disabled:opacity-60 sm:text-lg"
          >
            <Roll label={state === "sending" ? "Küldés…" : "Kérek egy rövid konzultációt →"} hover="Küldés!" />
          </button>
        </Halo>
      </div>
      <p className="relative mt-1 text-center text-xs text-ink/50">Az adatokat bizalmasan kezeljük, harmadik félnek nem adjuk át.</p>
    </form>
  );
}
