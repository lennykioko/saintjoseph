export function DayHeader({ day, theme }: { day: number; theme: string }) {
  return (
    <header className="mb-8">
      <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-2">
        Day {day}
      </div>
      <h1 className="text-[clamp(1.875rem,2vw+1.2rem,2.25rem)] font-bold leading-tight text-[var(--color-accent)] tracking-tight">
        {theme}
      </h1>
    </header>
  );
}

export function PageHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-2">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="text-[clamp(1.875rem,2vw+1.2rem,2.25rem)] font-bold leading-tight text-[var(--color-accent)] tracking-tight">
        {title}
      </h1>
    </header>
  );
}
