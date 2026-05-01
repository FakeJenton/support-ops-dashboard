import { data } from "../lib/data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Header() {
  const { date_range, total_tickets } = data.overview;
  return (
    <header className="border-b border-[var(--card-border)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--red)]" />
          Support Operations Review
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--navy)] sm:text-4xl">
          Q1 2026 Support Performance Review
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {total_tickets.toLocaleString()} tickets analyzed across{" "}
          {formatDate(date_range.start)} to {formatDate(date_range.end)}, on a
          synthetic dataset of customer support operations.
        </p>
      </div>
    </header>
  );
}
