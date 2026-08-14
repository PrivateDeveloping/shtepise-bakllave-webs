import { eur, sizes, type SizeId } from "@/config/business";

export function SizeSelector({
  value,
  onChange,
  className = "",
}: {
  value: SizeId;
  onChange: (s: SizeId) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sizes.map((s) => {
        const active = s.id === value;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            aria-pressed={active}
            className={`min-w-[7.5rem] border px-4 py-2.5 text-left text-sm transition-colors ${
              active
                ? "border-honey bg-honey/12 text-foreground"
                : "border-border text-muted-foreground hover:border-honey/60"
            }`}
          >
            <span className="block">{s.label}</span>
            <span className="block text-xs text-muted-foreground">{eur(s.price)}</span>
          </button>
        );
      })}
    </div>
  );
}
