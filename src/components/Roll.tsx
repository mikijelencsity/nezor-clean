// Gördülő gombfelirat: hoverre a szöveg felgördül, alulról egy másik jön (lásd .btn-roll a globals.css-ben).
export function Roll({ label, hover }: { label: React.ReactNode; hover: React.ReactNode }) {
  return (
    <>
      <span className="r-a">{label}</span>
      <span aria-hidden className="r-b">
        {hover}
      </span>
    </>
  );
}
