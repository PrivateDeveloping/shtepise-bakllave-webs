import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wordmark } from "./Wordmark";
import { useCart } from "@/lib/cart";

const nav = [
  { label: "Ballina", href: "/" },
  { label: "Bakllavat", href: "/#bakllavat" },
  { label: "Rreth Nesh", href: "/#rreth" },
  { label: "Porosit", href: "/porosit" },
  { label: "Kontakt", href: "/#kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:h-16">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => cart.setOpen(true)}
            className="relative px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Hap shportën"
          >
            Shporta
            {cart.count > 0 && (
              <span className="ml-1 text-honey">({cart.count})</span>
            )}
          </button>
          <Link
            to="/porosit"
            className="hidden bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Porosit Tani
          </Link>
          <button
            className="-mr-2 p-2 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-6 bg-foreground" />
            <span className="mt-1.5 block h-px w-6 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3.5 text-[0.95rem] text-foreground last:border-0"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
