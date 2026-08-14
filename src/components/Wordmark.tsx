export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span
        aria-hidden
        className="inline-block size-2 rotate-45 border border-honey/70 bg-honey/30 translate-y-[-1px]"
      />
      <span className="font-serif text-[1.05rem] tracking-[0.02em] text-foreground sm:text-[1.15rem]">
        Bakllavë e Shtëpisë
      </span>
    </span>
  );
}
