import { eur, priceFor, productName, sizeLabel } from "@/config/business";
import { useCart } from "@/lib/cart";

export function OrderSummary({ date }: { date?: string }) {
  const cart = useCart();
  return (
    <div className="border border-border bg-cream p-5">
      <p className="eyebrow">Përmbledhja e porosisë</p>
      <ul className="mt-4 space-y-3">
        {cart.items.map((it) => (
          <li key={`${it.productId}-${it.size}`} className="flex justify-between gap-4 text-sm">
            <span>
              {productName(it.productId)}
              <span className="block text-xs text-muted-foreground">
                {sizeLabel(it.size)} · {it.qty} × {eur(priceFor(it.size))}
              </span>
            </span>
            <span className="tabular-nums">{eur(priceFor(it.size) * it.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-1 border-t border-border/70 pt-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Nëntotali</span>
          <span className="tabular-nums text-foreground">{eur(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Dërgesa falas</span>
          <span className="tabular-nums text-foreground">0€</span>
        </div>
        {date && (
          <div className="flex justify-between text-muted-foreground">
            <span>Data e dëshiruar</span>
            <span className="text-foreground">{date}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between pt-2">
          <span>Totali</span>
          <span className="font-serif text-2xl tabular-nums">{eur(cart.total)}</span>
        </div>
      </div>
    </div>
  );
}
