import { Link } from "@tanstack/react-router";
import { eur, priceFor, productName, sizeLabel } from "@/config/business";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const cart = useCart();
  if (!cart.open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Mbyll shportën"
        onClick={() => cart.setOpen(false)}
        className="absolute inset-0 bg-brown/40"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg">Shporta</h2>
          <button onClick={() => cart.setOpen(false)} className="p-2 text-muted-foreground" aria-label="Mbyll">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {cart.items.length === 0 ? (
            <p className="py-10 text-sm text-muted-foreground">Shporta është e zbrazët.</p>
          ) : (
            cart.items.map((it) => (
              <div key={`${it.productId}-${it.size}`} className="border-b border-border/70 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.98rem]">{productName(it.productId)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Madhësia: {sizeLabel(it.size)} · {eur(priceFor(it.size))} / tepsi
                    </p>
                  </div>
                  <p className="font-serif text-lg tabular-nums">{eur(priceFor(it.size) * it.qty)}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button
                      className="h-9 w-9 text-muted-foreground"
                      onClick={() => cart.setQty(it.productId, it.size, it.qty - 1)}
                      aria-label="Zvogëlo"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm tabular-nums">{it.qty}</span>
                    <button
                      className="h-9 w-9 text-muted-foreground"
                      onClick={() => cart.setQty(it.productId, it.size, it.qty + 1)}
                      aria-label="Rrit"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => cart.remove(it.productId, it.size)}
                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Hiq
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border px-5 py-5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Nëntotali</span>
            <span className="tabular-nums text-foreground">{eur(cart.subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-muted-foreground">
            <span>Dërgesa falas</span>
            <span className="tabular-nums text-foreground">0€</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-border/70 pt-3">
            <span className="text-sm">Totali</span>
            <span className="font-serif text-2xl tabular-nums">{eur(cart.total)}</span>
          </div>
          <Link
            to="/porosit"
            onClick={() => cart.setOpen(false)}
            className="mt-4 block bg-primary px-5 py-3.5 text-center text-sm text-primary-foreground transition-opacity hover:opacity-90 aria-disabled:opacity-50"
            aria-disabled={cart.items.length === 0}
          >
            Vazhdo te porosia
          </Link>
        </div>
      </aside>
    </div>
  );
}
