// Zoom-hívás időpontjai a konzultációs űrlapon.
// A következő DAYS_AHEAD munkanapból lehet választani; minden nap 10 időpontjából (30 perces sávok)
// 4 választható, a többi áthúzva látszik. Hogy melyik 4, azt a dátum határozza meg, így újratöltéskor is ugyanazok maradnak.
// Valódi naptárfoglalás nincs mögötte: a választott időpontot az értesítő e-mail tartalmazza.

export const SLOT_STARTS = ["10:00", "10:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
export const SLOT_MINUTES = 30;
export const OFFERED_SLOTS = 4;
export const DAYS_AHEAD = 5;

/** a következő munkanap (hétfő–péntek), a mai napot nem számítva */
export function nextWorkday(now: Date = new Date()): Date {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  do d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6);
  return d;
}

/** a következő `count` munkanap, holnaptól */
export function nextWorkdays(count: number = DAYS_AHEAD, now: Date = new Date()): Date[] {
  const days: Date[] = [];
  let d = now;
  while (days.length < count) {
    d = nextWorkday(d);
    days.push(d);
  }
  return days;
}

/** rövid felirat a napválasztóhoz: { weekday: "hétfő", date: "nov. 9." } */
export function dayChip(day: Date): { weekday: string; date: string } {
  return {
    weekday: new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(day),
    date: new Intl.DateTimeFormat("hu-HU", { month: "short", day: "numeric" }).format(day),
  };
}

function endOf(start: string): string {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + SLOT_MINUTES;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** „10:00–10:30” formátum */
export function slotLabel(start: string): string {
  return `${start}–${endOf(start)}`;
}

/** a dátumhoz tartozó 4 felkínált időpont, időrendben */
export function offeredSlots(day: Date): string[] {
  // egyszerű, dátumból képzett ál-véletlen keverés (mindenkinek ugyanaz az adott napon)
  let seed = day.getFullYear() * 10000 + (day.getMonth() + 1) * 100 + day.getDate();
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const idx = SLOT_STARTS.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx
    .slice(0, OFFERED_SLOTS)
    .sort((a, b) => a - b)
    .map((i) => SLOT_STARTS[i]);
}

/** „november 9., hétfő” */
export function dayLabel(day: Date): string {
  return new Intl.DateTimeFormat("hu-HU", { month: "long", day: "numeric", weekday: "long" }).format(day);
}

/** az e-mailbe: „2026. november 9., hétfő 10:30–11:00” */
export function fullSlotLabel(day: Date, start: string): string {
  const date = new Intl.DateTimeFormat("hu-HU", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(day);
  return `${date} ${slotLabel(start)}`;
}
