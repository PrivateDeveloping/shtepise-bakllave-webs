import { products } from "@/config/business";
import { ProductCard } from "./ProductCard";

export function ProductSection() {
  return (
    <section id="bakllavat" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-6">
      <div className="max-w-xl">
        <p className="eyebrow">Bakllavat</p>
        <h2 className="mt-3 text-[1.8rem] leading-tight sm:text-[2.15rem]">
          Dy lloje. Të dyja të bëra në shtëpi.
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
          Nuk kemi menu të gjatë. Kemi bakllavë me arra dhe pa arra, në tri madhësi tepsish —
          aq sa mund të bëhen mirë me dorë.
        </p>
      </div>

      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} reversed={i % 2 === 1} />
      ))}
    </section>
  );
}
