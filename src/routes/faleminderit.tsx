import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { business, eur } from "@/config/business";

const title = "Faleminderit për porosinë — Bakllavë e Shtëpisë";
const description = "Porosia juaj është pranuar. Do t'ju kontaktojmë për ta konfirmuar.";

export const Route = createFileRoute("/faleminderit")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faleminderit" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/faleminderit" }],
  }),
  component: Faleminderit,
});

type LastOrder = {
  reference: string;
  name: string;
  date: string;
  total: number;
  items: { name: string; size: string; qty: number; unitPrice: number }[];
};

function Faleminderit() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bes-last-order");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 md:py-24">
      <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">Faleminderit për porosinë!</h1>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
        Porosia juaj është pranuar. Do t'ju kontaktojmë për ta konfirmuar porosinë dhe kohën e
        dorëzimit.
      </p>

      {order && (
        <div className="mt-10 border border-border bg-cream p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="eyebrow">Referenca</p>
            <p className="font-serif text-lg">{order.reference}</p>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Klienti" value={order.name} />
            {order.items.map((i, idx) => (
              <Row
                key={idx}
                label={i.name}
                value={`${i.size} · ${i.qty} × ${eur(i.unitPrice)}`}
              />
            ))}
            <Row label="Data e dëshiruar" value={order.date} />
            <Row label="Dërgesa" value="Falas" />
          </dl>
          <div className="mt-5 flex items-baseline justify-between border-t border-border/70 pt-4">
            <span className="text-sm">Totali</span>
            <span className="font-serif text-2xl tabular-nums">{eur(order.total)}</span>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="bg-primary px-5 py-3 text-sm text-primary-foreground">
          Kthehu në Ballinë
        </Link>
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-primary px-5 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Na kontakto në Instagram
        </a>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
