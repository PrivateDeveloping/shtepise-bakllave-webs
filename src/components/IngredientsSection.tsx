import { ingredients } from "@/config/business";
import { Photo } from "./Photo";

export function IngredientsSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div>
          <p className="eyebrow">Përbërësit</p>
          <h2 className="mt-3 text-[1.8rem] leading-tight sm:text-[2.15rem]">
            Përbërës të thjeshtë. Cilësi që ndihet në çdo kafshatë.
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            Nuk ka listë të gjatë. Vetëm gjërat që i duhen bakllavasë së vërtetë, të zgjedhura me
            kujdes dhe të blera të freskëta.
          </p>
          <ul className="mt-8 max-w-sm">
            {ingredients.map((it) => (
              <li
                key={it}
                className="flex items-baseline justify-between border-b border-border/70 py-3 text-[0.95rem]"
              >
                <span className="text-foreground">{it}</span>
                <span aria-hidden className="size-1.5 rotate-45 bg-honey/60" />
              </li>
            ))}
          </ul>
        </div>
        <Photo
          name="prep"
          className="overflow-hidden self-start md:mt-10"
          imgClassName="w-full object-cover aspect-[4/3]"
        />
      </div>
    </section>
  );
}
