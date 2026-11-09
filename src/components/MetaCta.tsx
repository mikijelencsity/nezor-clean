import { OpenWizardButton } from "./OpenWizardButton";
import { Halo } from "./Halo";

function IconBadge({
  children,
  className,
  anim,
  bg,
}: {
  children: React.ReactNode;
  className: string;
  anim: "animate-float-a" | "animate-float-b" | "animate-float-c";
  bg: string;
}) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 opacity-80 shadow-lg shadow-black/40 blur-[1.5px] sm:h-16 sm:w-16 ${anim} ${className}`}
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="#fff">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" stroke="none" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="#fff">
      <path d="M12 2C6.48 2 2 6.15 2 11.3c0 2.94 1.46 5.56 3.74 7.27V22l3.42-1.88c.91.25 1.87.38 2.84.38 5.52 0 10-4.15 10-9.3S17.52 2 12 2zm1.02 12.53-2.55-2.72-4.98 2.72 5.48-5.82 2.6 2.72 4.92-2.72-5.47 5.82z" />
    </svg>
  );
}

function MetaIcon() {
  return (
    <span className="text-3xl font-black leading-none text-white sm:text-4xl">
      &#8734;
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="#fff">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.5-.3z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="1.8">
      <path
        d="M12 21c-4.5 0-7.5-2.7-7.5-8.5S7.5 3 12 3c3.8 0 6.3 1.8 6.9 4.6.5 2.4-.3 4-2.3 4.3-1.7.3-2.8-.5-2.9-1.7-.1-1 .5-1.7 1.6-1.9"
        strokeLinecap="round"
      />
      <path
        d="M14.8 10.9c.2 3-1.4 4.6-3.8 4.6-1.8 0-3-1-3-2.4 0-1.6 1.4-2.5 3.4-2.5 2.6 0 5 .8 5.6 3.2.5 2.1-.4 4.5-3.2 5.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdsManagerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" />
    </svg>
  );
}

function PixelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.4" fill="#fff" stroke="none" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
    </svg>
  );
}

function BusinessSuiteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="1.8">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
      <path d="M3 13h18" />
    </svg>
  );
}

function AudienceNetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9" fill="none" stroke="#fff" strokeWidth="1.8">
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <circle cx="12" cy="17" r="2.2" />
      <path d="M7.6 8.6 10.6 15M16.4 8.6 13.4 15M8.2 7h7.6" strokeLinecap="round" />
    </svg>
  );
}

export function MetaCta() {
  return (
    <section
      className="relative flex min-h-[34rem] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center text-[#f8f9fa] sm:min-h-[42rem]"
      style={{
        background:
          "radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 35%, #000000 75%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <IconBadge className="absolute left-[6%] top-[18%]" anim="animate-float-a" bg="#1877F2">
          <FacebookIcon />
        </IconBadge>
        <IconBadge
          className="absolute right-[8%] top-[14%]"
          anim="animate-float-b"
          bg="linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)"
        >
          <InstagramIcon />
        </IconBadge>
        <IconBadge
          className="absolute left-[12%] bottom-[20%]"
          anim="animate-float-c"
          bg="linear-gradient(135deg,#00b2ff,#006aff,#a033ff)"
        >
          <MessengerIcon />
        </IconBadge>
        <IconBadge className="absolute right-[14%] bottom-[16%]" anim="animate-float-a" bg="#0866FF">
          <MetaIcon />
        </IconBadge>
        <IconBadge className="absolute right-[26%] top-[62%]" anim="animate-float-b" bg="#25D366">
          <WhatsAppIcon />
        </IconBadge>
        <IconBadge className="absolute left-[24%] top-[10%]" anim="animate-float-c" bg="#2e2e2e">
          <ThreadsIcon />
        </IconBadge>
        <IconBadge className="absolute right-[22%] bottom-[10%]" anim="animate-float-a" bg="linear-gradient(135deg,#0866FF,#00C6FF)">
          <AdsManagerIcon />
        </IconBadge>
        <IconBadge className="absolute left-[7%] top-[52%]" anim="animate-float-b" bg="#1877F2">
          <PixelIcon />
        </IconBadge>
        <IconBadge className="absolute right-[7%] top-[42%]" anim="animate-float-c" bg="#2e2e2e">
          <BusinessSuiteIcon />
        </IconBadge>
        <IconBadge className="absolute left-[32%] bottom-[8%]" anim="animate-float-a" bg="linear-gradient(135deg,#0866FF,#5ad1ff)">
          <AudienceNetworkIcon />
        </IconBadge>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-start justify-between px-[4%] pt-[8%] sm:hidden">
        <IconBadge className="" anim="animate-float-a" bg="#1877F2">
          <FacebookIcon />
        </IconBadge>
        <IconBadge
          className=""
          anim="animate-float-c"
          bg="linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)"
        >
          <InstagramIcon />
        </IconBadge>
        <IconBadge className="" anim="animate-float-b" bg="#25D366">
          <WhatsAppIcon />
        </IconBadge>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/meta3d/raketa.webp" alt="" className="animate-float-a mx-auto mb-4 w-28 select-none drop-shadow-[0_22px_30px_rgba(8,102,255,0.55)] sm:w-40" />
        <h2 className="font-display leading-[0.95]">
          <span className="block whitespace-nowrap text-[clamp(1.35rem,5.4vw,3.75rem)]">
            A PÉNZ NEM FOG MAGÁTÓL BEJÖNNI.
          </span>
          <span className="mt-2 block text-[clamp(1.35rem,5.4vw,3.75rem)]">MI SEM,</span>
          <span className="mt-2 block text-[clamp(1.35rem,5.4vw,3.75rem)]">DE MI LEGALÁBB HÍVUNK.</span>
        </h2>
        <Halo onBlue className="mt-10">
          <OpenWizardButton hover="VÉGRE." tone="white" className="font-display rounded-full bg-accent px-12 py-7 text-2xl tracking-wide text-white sm:text-3xl">
            TÖBB PÉNZT AKAROK
          </OpenWizardButton>
        </Halo>
      </div>
    </section>
  );
}
