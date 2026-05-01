interface ActionProps {
  title: string;
  description: string;
}

interface TakeawayProps {
  variant?: "alert" | "neutral" | "warn" | "good";
  eyebrow?: string;
  insight: string;
  implication?: string;
  action?: ActionProps;
}

const VARIANTS: Record<
  NonNullable<TakeawayProps["variant"]>,
  { border: string; text: string }
> = {
  alert: { border: "var(--red)", text: "text-[var(--red)]" },
  neutral: { border: "#475569", text: "text-slate-600" },
  warn: { border: "#D68910", text: "text-[#B7791F]" },
  good: { border: "var(--green)", text: "text-[var(--green)]" },
};

export default function Takeaway({
  variant = "alert",
  eyebrow = "The Takeaway",
  insight,
  implication,
  action,
}: TakeawayProps) {
  const v = VARIANTS[variant];
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-[var(--card-border)] bg-white shadow-sm">
      <div className="flex">
        <div
          className="w-1.5 flex-shrink-0"
          style={{ backgroundColor: v.border }}
        />
        <div className="flex-1 p-6 sm:p-7">
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${v.text}`}
          >
            {eyebrow}
          </div>
          <p className="mt-2 text-2xl font-semibold leading-snug text-[var(--navy)] sm:text-3xl">
            {insight}
          </p>
          {implication && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
              {implication}
            </p>
          )}
          {action && (
            <div className="mt-5 rounded-lg border-l-4 border-[var(--red)] bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
                Recommended action
              </div>
              <div className="mt-1.5 text-base font-semibold text-[var(--navy)]">
                {action.title}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {action.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
