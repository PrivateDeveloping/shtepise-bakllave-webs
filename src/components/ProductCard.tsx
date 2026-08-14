import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Photo } from "./Photo";
import { SizeSelector } from "./SizeSelector";
import { eur, priceFor, type ProductId, type SizeId } from "@/config/business";
import { useCart } from "@/lib/cart";

type Props = {
  product: { id: ProductId; name: string; description: string; image: "tray" | "closeup" };
  reversed?: boolean;
};

export function ProductCard({ product, reversed }: Props) {
  const [size, setSize] = useState<SizeId>("medium");
  const [qty, setQty] = useState(1);
  const cart = useCart();
  const navigate = useNavigate();
  const price = priceFor(size) * qty;

  return (
    <article className="grid gap-8 border-t border-border/70 py-12 md:grid-cols-2 md:gap-14 md:py-16">
      <Photo
        name={product.image}
        className={`overflow-hidden bg-cream ${reversed ? "md:order-2" : ""}`}
        imgClassName="w-full object-cover aspect-[4/3] md:aspect-[4/4.4]"
      />

      <div className={`flex flex-col justify-center ${reversed ? "md:order-1" : ""}`}>
        <h3 className="text-2xl sm:text-[1.75rem]">{product.name}</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-7">
          <p className="eyebrow">Madhësia</p>
          <SizeSelector value={size} onChange={setSize} className="mt-3" />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-11 w-11 text-lg text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Zvogëlo sasinë"
            >
              −
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-11 w-11 text-lg text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Rrit sasinë"
            >
              +
            </button>
          </div>
          <p className="font-serif text-2xl text-foreground">{eur(price)}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => {
              cart.add(product.id, size, qty);
              cart.setOpen(true);
            }}
            className="border border-primary px-5 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Shto në shportë
          </button>
          <button
            onClick={() => {
              cart.add(product.id, size, qty);
              navigate({ to: "/porosit" });
            }}
            className="bg-primary px-5 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Porosit Tani
          </button>
        </div>
      </div>
    </article>
  );
}
