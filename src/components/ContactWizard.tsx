"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Roll } from "./Roll";

export type Advertised = "igen" | "nem";

type Answers = Record<string, string>;

type Step = {
  id: string;
  title: string | ((a: Answers) => string);
  options?: string[] | ((a: Answers) => string[]);
  showIf?: (a: Answers, prefilled: boolean) => boolean;
  custom?: string;
};

const SPEND = [
  "Kevesebb mint 100 ezer Ft",
  "100–300 ezer Ft",
  "300–800 ezer Ft",
  "800 ezer Ft fölött",
];

const STEPS: Step[] = [
  {
    id: "business",
    title: "Mivel foglalkozol?",
    options: ["Webshop", "Szolgáltatás", "Helyi üzlet"],
    custom: "Egyéb, megírom",
  },
  {
    id: "advertised",
    title: "Hirdettél már Facebookon vagy Instagramon?",
    options: ["Igen", "Nem"],
    showIf: (_a, prefilled) => !prefilled,
  },
  {
    id: "spend",
    title: (a) =>
      a.advertised === "igen"
        ? "Mennyit költöttél eddig havonta hirdetésre?"
        : "Mennyi havi keretet szánnál hirdetésre?",
    options: (a) =>
      a.advertised === "igen" ? SPEND : [...SPEND, "Még nem tudom"],
  },
  {
    id: "problem",
    title: "Mi a legnagyobb gond a mostani hirdetésekkel?",
    options: [
      "Nem hoz eladást",
      "Túl drága egy vásárló",
      "Nem tudom, mi működik",
      "Nincs időm foglalkozni vele",
    ],
    custom: "Más, megírom",
    showIf: (a) => a.advertised === "igen",
  },
  {
    id: "goal",
    title: "Mi a fő célod?",
    options: ["Több rendelés", "Több érdeklődő vagy időpont", "Ismertség"],
    custom: "Más, megírom",
  },
  { id: "contact", title: "Hogyan érhetünk el?" },
];

function isVisible(s: Step, a: Answers, prefilled: boolean) {
  return s.showIf ? s.showIf(a, prefilled) : true;
}

// A /konzultacio oldal belépője: az előválasztást az URL-ből olvassa (?hirdetett=igen|nem).
export function ConsultationWizard() {
  const params = useSearchParams();
  const v = params.get("hirdetett");
  const advertised: Advertised | null = v === "igen" || v === "nem" ? v : null;
  return <ContactWizard advertised={advertised} />;
}

export function ContactWizard({ advertised }: { advertised: Advertised | null }) {
  const prefilled = advertised !== null;
  const [answers, setAnswers] = useState<Answers>(advertised ? { advertised } : {});
  const [history, setHistory] = useState<string[]>([]);
  const [current, setCurrent] = useState("business");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", site: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");

  const visible = STEPS.filter((s) => isVisible(s, answers, prefilled));
  const step = STEPS.find((s) => s.id === current)!;
  const index = Math.max(visible.findIndex((s) => s.id === current), 0);

  function goNext(nextAnswers: Answers) {
    const from = STEPS.findIndex((s) => s.id === current);
    const next = STEPS.slice(from + 1).find((s) =>
      isVisible(s, nextAnswers, prefilled),
    );
    setDir("fwd");
    setCustomOpen(false);
    setCustomText("");
    setHistory((h) => [...h, current]);
    if (next) setCurrent(next.id);
  }

  function pick(option: string) {
    const value = step.id === "advertised" ? option.toLowerCase() : option;
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    goNext(next);
  }

  function back() {
    const prev = history[history.length - 1];
    if (!prev) return;
    setDir("back");
    setCustomOpen(false);
    setCustomText("");
    setHistory((h) => h.slice(0, -1));
    setCurrent(prev);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, ...form }),
      });
      if (!res.ok) throw new Error("send failed");
      setDir("fwd");
      setDone(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  const title = typeof step.title === "function" ? step.title(answers) : step.title;
  const options =
    typeof step.options === "function" ? step.options(answers) : step.options;
  const anim = dir === "fwd" ? "animate-step-in-right" : "animate-step-in-left";

  const input =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none";

  return (
    <div className="relative mx-auto w-full max-w-xl">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/meta3d/szikra.webp" alt="" className="animate-float-b pointer-events-none absolute -right-8 -top-24 z-10 hidden w-36 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)] sm:block lg:-right-40 lg:-top-24 lg:w-48" />
    <div className="relative w-full overflow-hidden rounded-3xl border border-ink/10 bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(8,102,255,0.35)] sm:p-8">
      <div className="mb-6 flex items-center gap-4" aria-label={`${done ? visible.length : index + 1}. lépés ${visible.length}-ből`}>
        <div className="flex flex-1 gap-1.5">
          {visible.map((s, i) => {
            const complete = done || i < index;
            return (
              <div key={s.id} className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out wiz-fill`}
                  style={{ width: complete ? "100%" : "0%" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div key={done ? "done" : current} className={anim}>
        {done ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/meta3d/szivlajk.webp" alt="" className="animate-float-a w-44 select-none drop-shadow-[0_22px_26px_rgba(8,102,255,0.28)]" />
            <h2 className="font-display text-5xl">KÖSZÖNJÜK!</h2>
            <p className="text-lg text-ink/70">
              Megkaptuk a válaszaidat, hamarosan keresünk az időpont
              egyeztetésével.
            </p>
            <Link
              href="/"
              className="mt-4 rounded-full bg-accent px-10 py-4 font-semibold text-white"
            >
              Vissza a főoldalra
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mb-5 font-display text-3xl sm:text-4xl">{title}</h2>

            {options ? (
              <div className="flex flex-col gap-2">
                {options.map((o) => (
                  <button
                    key={o}
                    onClick={() => pick(o)}
                    className="rounded-xl border border-ink/15 px-5 py-3 text-left text-base sm:text-lg transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  >
                    {o}
                  </button>
                ))}
                {step.custom &&
                  (customOpen ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (customText.trim()) pick(customText.trim());
                      }}
                      className="flex gap-2"
                    >
                      <input
                        autoFocus
                        required
                        className={input}
                        placeholder="Írd le saját szavaiddal"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-xl bg-accent px-5 font-semibold text-white"
                      >
                        Tovább
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setCustomOpen(true)}
                      className="rounded-xl border border-dashed border-ink/25 px-5 py-3 text-left text-base sm:text-lg text-ink/60 transition-colors hover:border-accent hover:text-accent"
                    >
                      {step.custom}
                    </button>
                  ))}
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-2">
                <input
                  required
                  className={input}
                  placeholder="Neved"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  className={input}
                  placeholder="Telefonszám"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  className={input}
                  placeholder="E-mail cím"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Weboldal vagy Facebook-oldal (nem kötelező)"
                  value={form.site}
                  onChange={(e) => setForm({ ...form, site: e.target.value })}
                />
                <textarea
                  rows={2}
                  className={input}
                  placeholder="Üzenet, ha van mit hozzátenned (nem kötelező)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {sendError && (
                  <p className="text-sm text-red-600">Nem sikerült elküldeni. Próbáld újra, vagy írj az info@nezor.hu címre.</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-roll roll-dark mt-2 rounded-full bg-accent px-10 py-3.5 text-base font-semibold text-white disabled:opacity-60"
                >
                  <Roll label={sending ? "Küldés..." : "Küldöm"} hover="Mehet!" />
                </button>
              </form>
            )}

            {history.length > 0 && (
              <button
                onClick={back}
                className="mt-4 text-sm text-ink/50 hover:text-ink"
              >
                ← Vissza
              </button>
            )}
          </>
        )}
      </div>
    </div>
    </div>
  );
}
