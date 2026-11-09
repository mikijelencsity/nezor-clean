"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { WIZARD_NAME_KEY } from "./ContactWizardProvider";
import { formatHuf } from "@/data/cases";
import { AD_FEE_DISCOUNTED_HUF, AD_FEE_HUF, WEB_AD_DISCOUNT } from "@/data/offers";
import { SLOT_STARTS, dayChip, fullSlotLabel, nextWorkdays, offeredSlots, slotLabel } from "@/lib/callSlots";

type CallType = "telefon" | "zoom";
const CALL_LABEL: Record<CallType, string> = { telefon: "Telefonhívás", zoom: "Zoom-hívás" };

export type Advertised = "igen" | "nem";
export type Service = "hirdetes" | "weboldal" | "webshop";
/** honnan indult a látogató: konkrét szolgáltatás, vagy "web" (weboldal vagy webshop, még nem tudjuk melyik) */
export type ServicePreset = Service | "web";

// A hirdetéses kérdéssor a nezor.hu/landing10 űrlapja alapján készült.
const PRIVACY_URL = "https://www.nezor.hu/adatkezeles";

const SERVICES: { id: Service; label: string; desc: string; icon: string }[] = [
  { id: "hirdetes", label: "Hirdetések", desc: "Kevés a megkeresés, több vevő kellene", icon: "📣" },
  { id: "weboldal", label: "Weboldal", desc: "Nincs oldalam, vagy a mostani nem hoz megkeresést", icon: "🌐" },
  { id: "webshop", label: "Webshop", desc: "Online adnék el, vagy a mostani boltom nem elad", icon: "🛒" },
];
const SERVICE_LABEL: Record<Service, string> = { hirdetes: "Facebook-hirdetés", weboldal: "Weboldal", webshop: "Webshop" };

const NOT_TRIED = "Még nem próbáltam";
const FB_OPTIONS = ["Igen, most is hirdetek", "Próbáltam, de abbahagytam", NOT_TRIED];
const CHANNELS = [
  { label: "Facebook", icon: "f", color: "#1877f2" },
  { label: "Google", icon: "G", color: "#ea4335" },
  { label: "Weboldal", icon: "🌐", color: "#0f9d58" },
  { label: "Ajánlás", icon: "🗣️", color: "#8e44ad" },
  { label: "Szórólap / újság", icon: "📰", color: "#1565c0" },
  { label: "Hirdetési portál", icon: "📋", color: "#f39c12" },
  { label: "Egyéb", icon: "🔔", color: "#f1c40f" },
  { label: "Semmi", icon: "⛔", color: "#777777" },
];
const BUDGETS = ["50 000 Ft alatt", "50–100 ezer Ft", "100–200 ezer Ft", "200–500 ezer Ft", "500 ezer Ft felett", "Még nem tudom"];

// a meglévő oldalra vonatkozó válaszok; az első mindig a „nincs még”
const EXISTING: Record<"weboldal" | "webshop", string[]> = {
  weboldal: ["Nincs még", "Van, de újat szeretnék", "Van, csak fejleszteni kellene"],
  webshop: ["Nincs még, most indulnék", "Van webshopom, de újat szeretnék", "Van weboldalam, abból lenne webshop"],
};

// hirdetéses ágban: rendben van-e a weboldal; az első az „igen”, a többinél felkínáljuk, hogy azt is mi csináljuk
const SITE_STATUS = ["Igen, van és jól működik", "Van, de régi vagy nem hoz megkeresést", "Nincs weboldalam"];
const SITE_OK = SITE_STATUS[0];
const NO_SITE = SITE_STATUS[2];

type StepId =
  | "kapcsolat"
  | "szolgaltatas"
  | "fb"
  | "csatornak"
  | "weboldal"
  | "webajanlat"
  | "meglevo"
  | "cim"
  | "leiras"
  | "ajanlat"
  | "keret"
  | "telefon";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function storedName() {
  try {
    return window.sessionStorage.getItem(WIZARD_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

// A **kiemelt** részeket kékkel jeleníti meg.
function Title({ text }: { text: string }) {
  return (
    <h2 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-[2.6rem]">
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </h2>
  );
}

// A /konzultacio oldal belépője: az előválasztást az URL-ből olvassa (?szolgaltatas=hirdetes|weboldal|webshop|web, ?hirdetett=igen|nem).
export function ConsultationWizard() {
  const params = useSearchParams();
  const a = params.get("hirdetett");
  const s = params.get("szolgaltatas");
  const advertised: Advertised | null = a === "igen" || a === "nem" ? a : null;
  const service: ServicePreset | null = s === "hirdetes" || s === "weboldal" || s === "webshop" || s === "web" ? s : null;
  return <ContactWizard advertised={advertised} service={service} />;
}

export function ContactWizard({ advertised, service = null }: { advertised: Advertised | null; service?: ServicePreset | null }) {
  // Aki a hirdetéses kártyáról jött (hirdetett igen/nem), annál a hirdetés már ki van választva.
  const preset: Service | null = advertised ? "hirdetes" : service === "web" ? null : service;
  const askService = preset === null;
  const serviceChoices = service === "web" ? SERVICES.filter((s) => s.id !== "hirdetes") : SERVICES;

  const [current, setCurrent] = useState<StepId>("kapcsolat");
  const [history, setHistory] = useState<StepId[]>([]);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // A kérdéssor a Suspense miatt csak böngészőben renderelődik, így itt olvasható a sessionStorage.
  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState("");
  // egy kötelező pipa: adatkezelési tájékoztató, e-mailes ajánlat és Meta-mérés együtt
  const [consent, setConsent] = useState(false);
  const [chosen, setChosen] = useState<Service | null>(preset);
  const [fb, setFb] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [existing, setExisting] = useState("");
  const [site, setSite] = useState("");
  const [about, setAbout] = useState("");
  const [addAds, setAddAds] = useState<boolean | null>(null);
  const [addWeb, setAddWeb] = useState<boolean | null>(null);
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [callType, setCallType] = useState<CallType | null>(null);
  const [slot, setSlot] = useState("");
  // a Zoom-időpontok napjai: a következő munkanapok (a kérdéssor csak böngészőben fut, így a dátum a látogatóé)
  const [zoomDays] = useState(() => nextWorkdays());
  const [dayIndex, setDayIndex] = useState(0);
  const zoomDay = zoomDays[dayIndex];
  const freeSlots = offeredSlots(zoomDay);

  // `existing`: hirdetésnél a weboldal állapota, weboldalnál és webshopnál a meglévő oldal
  type Flow = { chosen: Service | null; existing: string; addAds: boolean | null; addWeb: boolean | null };

  // A lépéssor a választásoktól függ: hirdetésnél a hirdetéses kérdések, weboldalnál és webshopnál a meglévő oldal,
  // majd a „kosár” lépés a hirdetéses kedvezménnyel; a havi keretet csak az kapja, aki a hirdetést is kéri.
  function buildSteps(f: Flow): StepId[] {
    const s: StepId[] = ["kapcsolat"];
    if (askService) s.push("szolgaltatas");
    const c = f.chosen ?? "hirdetes";
    if (c === "hirdetes") {
      // aki már jelezte, hogy nem hirdetett, annak nem kérdezzük újra
      if (advertised !== "nem") s.push("fb");
      s.push("csatornak", "weboldal");
      if (f.existing && f.existing !== NO_SITE) s.push("cim");
      if (f.existing !== SITE_OK) s.push("webajanlat");
      s.push("leiras", "keret", "telefon");
    } else {
      s.push("meglevo");
      if (f.existing && f.existing !== EXISTING[c][0]) s.push("cim");
      s.push("leiras", "ajanlat");
      if (f.addAds) s.push("keret");
      s.push("telefon");
    }
    return s;
  }

  const flow: Flow = { chosen, existing, addAds, addWeb };
  const steps = buildSteps(flow);
  const index = done ? steps.length : steps.indexOf(current);
  const first = name.trim();
  const web = chosen === "weboldal" || chosen === "webshop" ? chosen : null;
  // aki a hirdetéses kártyán már igent mondott, annak nem kínáljuk fel a „még nem” választ
  const fbOptions = advertised === "igen" ? FB_OPTIONS.filter((o) => o !== NOT_TRIED) : FB_OPTIONS;
  const isBeginner = advertised === "nem" || fb === NOT_TRIED;
  const cart = [
    ...(chosen ? [SERVICE_LABEL[chosen] + (chosen === "hirdetes" && addWeb ? ` (1. hónap −${WEB_AD_DISCOUNT * 100}%)` : "")] : []),
    ...(web && addAds ? [`Facebook-hirdetés (1. hónap −${WEB_AD_DISCOUNT * 100}%)`] : []),
    ...(chosen === "hirdetes" && addWeb ? ["Weboldal, soron kívül"] : []),
  ];

  // Az új választást átadjuk, mert az állapot csak a következő renderben frissül.
  function next(change: Partial<Flow> = {}) {
    const s = buildSteps({ ...flow, ...change });
    const following = s[s.indexOf(current) + 1];
    if (!following) return;
    setDir("fwd");
    setHistory((h) => [...h, current]);
    setCurrent(following);
  }

  function back() {
    const prev = history[history.length - 1];
    if (!prev) return;
    setDir("back");
    setHistory((h) => h.slice(0, -1));
    setCurrent(prev);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(false);
    const answers: Record<string, string> = {
      szolgaltatas: chosen ? SERVICE_LABEL[chosen] : "",
      kiindulas: advertised
        ? `Hirdetéses ajánlat (${advertised === "igen" ? "már hirdetett" : "még nem hirdetett"})`
        : service === "web"
          ? "Weboldalas oldal"
          : service
            ? SERVICE_LABEL[service]
            : "Általános",
    };
    if (chosen === "hirdetes") {
      answers.fb = fb || (advertised === "nem" ? NOT_TRIED : "");
      answers.csatornak = channels.join(", ");
      answers.weboldal_allapot = existing;
      if (site.trim()) answers.cim = site.trim();
      if (existing !== SITE_OK)
        answers.weboldal_ajanlat = addWeb
          ? `Kéri: weboldal soron kívül + első havi hirdetéskezelés ${formatHuf(AD_FEE_DISCOUNTED_HUF)} (${formatHuf(AD_FEE_HUF)} helyett)`
          : "Most nem kéri";
    } else {
      answers.meglevo = existing;
      if (site.trim()) answers.cim = site.trim();
      answers.hirdetes_ajanlat = addAds
        ? `Kéri: első havi hirdetéskezelés ${formatHuf(AD_FEE_DISCOUNTED_HUF)} (${formatHuf(AD_FEE_HUF)} helyett)`
        : "Most nem kéri";
    }
    answers.leiras = about.trim();
    if (budget) answers.keret = budget;
    if (callType) answers.hivas = CALL_LABEL[callType];
    if (callType === "zoom" && slot) answers.idopont = fullSlotLabel(zoomDay, slot);
    answers.hozzajarulas = consent ? "igen" : "nem";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: first, email: email.trim(), phone: phone.trim(), answers }),
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

  const anim = dir === "fwd" ? "animate-step-in-right" : "animate-step-in-left";
  const input =
    "w-full rounded-xl border border-black/25 bg-white px-5 py-4 text-lg text-black placeholder:text-black/50 focus:border-black focus:outline-none";
  const primary =
    "flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-5 text-xl font-extrabold text-white shadow-[0_18px_40px_-16px_rgba(8,102,255,0.8)] transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:bg-[#c8c8c8] disabled:text-black/50 disabled:shadow-none";
  const secondary =
    "flex w-full items-center justify-center rounded-2xl border-2 border-black/15 bg-white px-6 py-4 text-lg font-bold text-black/70 transition-colors hover:border-black hover:text-black";
  const option =
    "w-full rounded-xl border border-black/20 bg-white px-5 py-4 text-left text-lg font-semibold text-black transition-colors hover:border-accent hover:bg-accent hover:text-white";
  const lead = "mb-3 text-center text-xl font-bold leading-snug text-[#333] sm:text-2xl";
  const hint = "mt-2 text-center text-[#5a5a5a]";

  const canContinue = first.length > 0 && isValidEmail(email) && consent;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative rounded-3xl border-2 border-black bg-white p-6 text-black shadow-[0_30px_80px_-30px_rgba(8,102,255,0.35)] sm:p-9">
        {/* előrehaladás */}
        <ol
          className="mb-7 flex items-center justify-center"
          aria-label={done ? "Kész" : `${index + 1}. lépés a ${steps.length}-ból`}
        >
          {[...steps, "kesz"].map((s, i) => (
            <li key={s} className="flex items-center">
              {i > 0 && <span className={`h-0.5 w-[clamp(0.375rem,3vw,1.25rem)] sm:w-12 ${i <= index ? "bg-accent" : "bg-black/15"}`} />}
              <span className={`h-3 w-3 shrink-0 rounded-full min-[360px]:h-3.5 min-[360px]:w-3.5 sm:h-4 sm:w-4 ${i <= index ? "bg-accent" : "bg-black/20"}`} />
            </li>
          ))}
        </ol>

        <div key={done ? "done" : current} className={anim}>
          {done ? (
            <div>
              <Title text={`Köszönjük, **${first}!**`} />
              <h3 className="mt-7 text-xl font-extrabold">Mi történik most?</h3>
              <ol className="mt-4 grid gap-3 text-lg leading-snug">
                {[
                  <b key="1">Átnézzük a válaszaidat{site.trim() ? " és a mostani oldaladat" : ""}.</b>,
                  <b key="2">24 órán belül hívunk.</b>,
                  web ? (
                    <span key="3">
                      <b>Rövid beszélgetés</b> arról, mire van szükséged, utána <b>árajánlatot küldünk</b>
                      {addAds ? <>, benne a hirdetéses kedvezménnyel</> : null}.
                    </span>
                  ) : (
                    <span key="3">
                      <b>Rövid, lényegre törő beszélgetés</b>, és a válaszaid alapján <b>ügyfélszerzési tervet</b> kapsz
                      {addWeb ? <>, a weboldalra pedig árajánlatot</> : null}.
                    </span>
                  ),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
              <Link href="/" className={`${primary} mt-7`}>
                Vissza a főoldalra
              </Link>
            </div>
          ) : current === "kapcsolat" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canContinue) next();
              }}
            >
              <p className={lead}>Rendben, nem húzzuk az időd. De mielőtt belevágunk, nem akarunk udvariatlanok lenni…</p>
              <Title text="**Hogy hívnak**, és hova írhatunk?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <input
                  required
                  autoComplete="given-name"
                  aria-label="Keresztneved"
                  className={input}
                  placeholder="Keresztneved"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  aria-label="E-mail-címed"
                  className={input}
                  placeholder="E-mail-címed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="mt-1 flex items-start gap-3 text-sm leading-relaxed text-[#5a5a5a]">
                  <input
                    required
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-6 w-6 shrink-0 accent-accent"
                  />
                  <span>
                    Elfogadom az{" "}
                    <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-black underline">
                      Adatkezelési tájékoztatót
                    </a>
                    , az e-mailes ajánlatokat és a Meta-mérést. *
                  </span>
                </label>
                <button type="submit" disabled={!canContinue} className={`${primary} mt-2`}>
                  Tovább <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : current === "szolgaltatas" ? (
            <div>
              <p className={lead}>Szia {first}! Hogy a megfelelő kérdéseket tegyük fel…</p>
              <Title text="Mi a **gond**, amiben segítsünk?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {serviceChoices.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      // másik szolgáltatásnál a korábbi ág válaszai nem érvényesek
                      if (s.id !== chosen) {
                        setExisting("");
                        setSite("");
                        setAddAds(null);
                        setAddWeb(null);
                        setBudget("");
                      }
                      setChosen(s.id);
                      next({ chosen: s.id, ...(s.id !== chosen ? { existing: "", addAds: null, addWeb: null } : {}) });
                    }}
                    className={`${option} flex items-center gap-4`}
                  >
                    <span aria-hidden className="text-2xl">
                      {s.icon}
                    </span>
                    <span>
                      <span className="block">{s.label}</span>
                      <span className="block text-sm font-normal opacity-75">{s.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : current === "fb" ? (
            <div>
              {!askService && <p className={lead}>Szia {first}! Hogy kiderüljön, tényleg tudunk-e segíteni a vállalkozásodnak… van pár kérdésünk.</p>}
              <Title text="Először: próbáltál már **fizetett Facebook-hirdetést**?" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {fbOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setFb(o);
                      next();
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : current === "csatornak" ? (
            <div>
              {isBeginner && <p className={lead}>Semmi gond, {first}, a legtöbb ügyfelünk is így kezdte. Mi mindent beállítunk.</p>}
              <Title text="Oké, szuper! Most **honnan jönnek az ügyfeleid**?" />
              <p className={hint}>(Többet is választhatsz)</p>
              <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3">
                {CHANNELS.map((c) => {
                  const on = channels.includes(c.label);
                  return (
                    <button
                      key={c.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setChannels((list) => (on ? list.filter((x) => x !== c.label) : [...list, c.label]))}
                      className={`flex min-w-0 items-center gap-3 rounded-xl border-2 bg-white px-3 py-3 text-left font-semibold leading-tight text-black transition-colors sm:px-4 ${
                        on ? "border-accent bg-accent/10" : "border-black/15 hover:border-accent"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-extrabold text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.icon}
                      </span>
                      <span className="min-w-0">{c.label}</span>
                    </button>
                  );
                })}
              </div>
              <button type="button" disabled={channels.length === 0} onClick={() => next()} className={`${primary} mx-auto mt-5 max-w-xl`}>
                Tovább <span aria-hidden>→</span>
              </button>
            </div>
          ) : current === "weboldal" ? (
            <div>
              <Title text="És a **weboldalad** rendben van?" />
              <p className={hint}>A hirdetés oda viszi az embereket. Ha az oldal nem győz meg, a pénz egy része elfolyik.</p>
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {SITE_STATUS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setExisting(o);
                      if (o === NO_SITE) setSite("");
                      if (o === SITE_OK) setAddWeb(null);
                      next({ existing: o, ...(o === SITE_OK ? { addWeb: null } : {}) });
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : current === "webajanlat" ? (
            // „kosár” lépés a hirdetéses ágban: a hirdetés mellé felkínáljuk a weboldalt, soron kívül és kedvezménnyel
            <div>
              <Title text="Egy ajánlat, **mielőtt továbbmegyünk**" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-black/15 bg-[#f8f9fa] px-5 py-4">
                  <span className="flex items-center gap-3 font-semibold">
                    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                      ✓
                    </span>
                    Facebook-hirdetés
                  </span>
                  <span className="text-sm text-[#5a5a5a]">{formatHuf(AD_FEE_HUF)}/hó</span>
                </div>

                <div className="relative rounded-2xl border-2 border-dashed border-accent bg-accent/[0.06] p-5 sm:p-6">
                  <span className="absolute -top-3.5 right-4 rounded-full bg-accent px-3 py-1 text-sm font-extrabold text-white shadow-md">
                    SORON KÍVÜL
                  </span>
                  <p className="text-sm font-semibold tracking-widest text-accent">AJÁNLOTT MELLÉ</p>
                  <p className="mt-1 text-xl font-extrabold leading-snug">
                    {existing === NO_SITE ? "Weboldal, ahová a hirdetés vezet" : "Új weboldal, ami tényleg megkeresést hoz"}
                  </p>
                  <p className="mt-2 leading-snug text-[#4a4a4a]">
                    Ha a weboldaladat is mi csináljuk, előre vesszük: nem kell kivárnod a sort, és mire a hirdetés elindul, az oldal is kész.
                  </p>
                  <p className="mt-3 leading-snug">
                    <b>Ráadásul</b> az első havi hirdetéskezelés díjának felét elengedjük:
                  </p>
                  <p className="mt-1 flex items-baseline gap-3">
                    <span className="text-lg text-black/45 line-through">{formatHuf(AD_FEE_HUF)}</span>
                    <span className="text-2xl font-extrabold text-accent">{formatHuf(AD_FEE_DISCOUNTED_HUF)}</span>
                    <span className="text-sm text-[#5a5a5a]">az első hónapban</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAddWeb(true);
                    next({ addWeb: true });
                  }}
                  className={`${primary} mt-1`}
                >
                  Kérem a weboldalt is <span aria-hidden>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddWeb(false);
                    next({ addWeb: false });
                  }}
                  className={secondary}
                >
                  Köszi, most csak a hirdetés
                </button>
              </div>
            </div>
          ) : current === "meglevo" && web ? (
            <div>
              {!askService && <p className={lead}>Szia {first}! Pár kérdés, és tudjuk, mivel készüljünk a hívásra.</p>}
              <Title text={web === "webshop" ? "Van már **webshopod**?" : "Van már **weboldalad**?"} />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {EXISTING[web].map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setExisting(o);
                      if (o === EXISTING[web][0]) setSite("");
                      next({ existing: o });
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : current === "cim" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
            >
              <Title text="Mi a **címe**? Megnézzük, mielőtt hívunk." />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <input
                  inputMode="url"
                  autoComplete="url"
                  aria-label="A mostani oldalad címe"
                  className={input}
                  placeholder="pl. cegnev.hu"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />
                <button type="submit" className={primary}>
                  {site.trim() ? "Tovább" : "Kihagyom"} <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : current === "leiras" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (about.trim()) next();
              }}
            >
              <Title
                text={
                  web === "webshop"
                    ? "Röviden: **mit árulnál**, és nagyjából hány terméket?"
                    : web === "weboldal"
                      ? "Röviden: **mivel foglalkozol**, és mit kellene tudnia az oldalnak?"
                      : "Röviden: **mivel foglalkozol**, kiknek, és milyen árszinten?"
                }
              />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <textarea
                  required
                  rows={4}
                  aria-label="Röviden a vállalkozásodról"
                  className={input}
                  placeholder={
                    web === "webshop"
                      ? "Pl. kézműves szappanok, kb. 40 termék, házhoz szállítással"
                      : web === "weboldal"
                        ? "Pl. villanyszerelő vagyok Győrben, kellene referenciagaléria és ajánlatkérő űrlap"
                        : "Pl. szépségszalon Budapesten, átlagosan 25 000 Ft-os kezelésekkel"
                  }
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <button type="submit" disabled={!about.trim()} className={primary}>
                  Tovább <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : current === "ajanlat" && web ? (
            // „kosár” lépés: a weboldal mellé felkínáljuk a hirdetést, kedvezménnyel
            <div>
              <Title text="Egy ajánlat, **mielőtt továbbmegyünk**" />
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-black/15 bg-[#f8f9fa] px-5 py-4">
                  <span className="flex items-center gap-3 font-semibold">
                    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-white">
                      ✓
                    </span>
                    {SERVICE_LABEL[web]}
                  </span>
                  <span className="text-sm text-[#5a5a5a]">egyedi árajánlat</span>
                </div>

                <div className="relative rounded-2xl border-2 border-dashed border-accent bg-accent/[0.06] p-5 sm:p-6">
                  <span className="absolute -top-3.5 right-4 rounded-full bg-accent px-3 py-1 text-sm font-extrabold text-white shadow-md">
                    −{WEB_AD_DISCOUNT * 100}%
                  </span>
                  <p className="text-sm font-semibold tracking-widest text-accent">AJÁNLOTT MELLÉ</p>
                  <p className="mt-1 text-xl font-extrabold leading-snug">Facebook- és Instagram-hirdetés, ami vevőt hoz az új oldaladra</p>
                  <p className="mt-2 leading-snug text-[#4a4a4a]">
                    Ha a {web === "webshop" ? "webshopod" : "weboldalad"} velünk készül, az első havi hirdetéskezelés díjának felét elengedjük. A
                    hirdetési keretet közvetlenül a Metának fizeted.
                  </p>
                  <p className="mt-3 flex items-baseline gap-3">
                    <span className="text-lg text-black/45 line-through">{formatHuf(AD_FEE_HUF)}</span>
                    <span className="text-2xl font-extrabold text-accent">{formatHuf(AD_FEE_DISCOUNTED_HUF)}</span>
                    <span className="text-sm text-[#5a5a5a]">az első hónapban</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAddAds(true);
                    next({ addAds: true });
                  }}
                  className={`${primary} mt-1`}
                >
                  Kérem ezt is <span aria-hidden>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddAds(false);
                    setBudget("");
                    next({ addAds: false });
                  }}
                  className={secondary}
                >
                  Köszi, most csak a {web === "webshop" ? "webshop" : "weboldal"}
                </button>
              </div>
            </div>
          ) : current === "keret" ? (
            <div>
              <Title text="Mekkora **havi összeget** szánnál hirdetésre?" />
              <p className={hint}>Azért kérdezzük, hogy lássuk, tudunk-e segíteni, és hogy a kereteden belül a legjobb megoldást javasoljuk.</p>
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {BUDGETS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setBudget(o);
                      next();
                    }}
                    className={option}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <Title text={`Köszi, ${first}! **Hogyan beszéljünk**, hogy elindítsuk a közös munkát?`} />
              <p className={hint}>Elmondjuk, mit javaslunk. Spam nincs.</p>
              <div className="mx-auto mt-6 grid max-w-xl gap-3">
                {/* hívás módja */}
                <div role="radiogroup" aria-label="Hogyan beszéljünk?" className="grid grid-cols-2 gap-3">
                  {(["telefon", "zoom"] as CallType[]).map((t) => {
                    const on = callType === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => {
                          setCallType(t);
                          if (t === "telefon") setSlot("");
                        }}
                        className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-4 text-center font-bold transition-colors ${
                          on ? "border-accent bg-accent text-white" : "border-black/20 bg-white text-black hover:border-accent"
                        }`}
                      >
                        <span aria-hidden className="text-2xl">{t === "telefon" ? "📞" : "🎥"}</span>
                        <span className="text-lg">{CALL_LABEL[t]}</span>
                        <span className={`text-xs font-medium ${on ? "text-white/85" : "text-black/55"}`}>
                          {t === "telefon" ? "Mi hívunk fel" : "Videóhívás, időpontra"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Zoom: napválasztó a következő munkanapokra, alatta a nap 10 időpontja (a nem választhatók áthúzva) */}
                {callType === "zoom" && (
                  <div className="min-w-0 rounded-2xl border border-black/10 bg-[#f8f9fa] p-4 sm:p-5">
                    <p className="text-center font-bold">Válassz napot és időpontot</p>
                    <div
                      role="radiogroup"
                      aria-label="Zoom-hívás napja"
                      className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"
                    >
                      {zoomDays.map((d, i) => {
                        const on = i === dayIndex;
                        const { weekday, date } = dayChip(d);
                        return (
                          <button
                            key={d.toDateString()}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => {
                              setDayIndex(i);
                              setSlot("");
                            }}
                            className={`flex min-w-[4.5rem] flex-1 shrink-0 flex-col items-center rounded-xl border-2 px-2 py-2 transition-colors ${
                              on ? "border-accent bg-accent text-white" : "border-black/15 bg-white text-black hover:border-accent"
                            }`}
                          >
                            <span className={`text-xs font-semibold ${on ? "text-white/85" : "text-black/55"}`}>{weekday}</span>
                            <span className="whitespace-nowrap text-base font-bold">{date}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div role="radiogroup" aria-label="Zoom-hívás időpontja" className="mt-3 grid grid-cols-2 gap-2">
                      {SLOT_STARTS.map((s) => {
                        const free = freeSlots.includes(s);
                        const on = slot === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            disabled={!free}
                            aria-label={free ? slotLabel(s) : `${slotLabel(s)}, nem választható`}
                            onClick={() => setSlot(s)}
                            className={`whitespace-nowrap rounded-xl border-2 px-2 py-3 text-base font-bold tabular-nums transition-colors sm:text-lg ${
                              !free
                                ? "cursor-not-allowed border-transparent bg-transparent text-black/30 line-through"
                                : on
                                  ? "border-accent bg-accent text-white"
                                  : "border-black/15 bg-white text-black hover:border-accent"
                            }`}
                          >
                            {slotLabel(s)}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-center text-sm text-[#5a5a5a]">A Zoom-linket e-mailben küldjük: {email.trim()}</p>
                  </div>
                )}

                {cart.length > 0 && (
                  <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#5a5a5a]">
                    Amit kérsz:
                    {cart.map((c) => (
                      <span key={c} className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
                        {c}
                      </span>
                    ))}
                  </p>
                )}
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  aria-label="Telefonszámod"
                  className={input}
                  placeholder="Telefonszámod"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {sendError && (
                  <p role="alert" className="text-sm text-red-600">
                    Nem sikerült elküldeni. Próbáld újra, vagy írj az info@nezor.hu címre.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending || !phone.trim() || !callType || (callType === "zoom" && !slot)}
                  className={primary}
                >
                  {sending ? "Küldés…" : "Elküldöm"} {!sending && <span aria-hidden>→</span>}
                </button>
              </div>
            </form>
          )}

          {!done && history.length > 0 && (
            <button type="button" onClick={back} className="mx-auto mt-5 block text-sm text-black/55 hover:text-black">
              ← Vissza
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
