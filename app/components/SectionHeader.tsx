interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--navy)] sm:text-2xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
