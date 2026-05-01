export default function HeadlineCallout() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-8 sm:px-10">
      <div className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-white shadow-sm">
        <div className="flex">
          <div className="w-1.5 flex-shrink-0 bg-[var(--red)]" />
          <div className="flex-1 p-7 sm:p-9">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--red)]">
              The Bottom Line
            </div>
            <p className="mt-3 text-3xl font-semibold leading-tight text-[var(--navy)] sm:text-4xl">
              Chat is the structural problem.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Chat carries{" "}
              <span className="font-semibold text-[var(--navy)]">
                43% of volume
              </span>{" "}
              but generates{" "}
              <span className="font-semibold text-[var(--red)]">
                50% of operational cost
              </span>
              ,{" "}
              <span className="font-semibold text-[var(--red)]">
                60% of negative CSAT
              </span>
              , and{" "}
              <span className="font-semibold text-[var(--red)]">
                100% of reopens
              </span>
              . Fixing chat is the single biggest lever in support operations
              this quarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
