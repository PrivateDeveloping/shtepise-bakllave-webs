import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/lib/cart";

const title = "Porosit bakllavë — Bakllavë e Shtëpisë";
const description =
  "Plotëso porosinë për bakllavë me arra ose pa arra. Dërgesa falas në Podujevë dhe Prishtinë, porosit 2–3 ditë më herët.";

export const Route = createFileRoute("/porosit")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/porosit" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/porosit" }],
  }),
  component: Porosit,
});

function Porosit() {
  const cart = useCart();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="eyebrow">Porosia</p>
      <h1 className="mt-3 text-[1.9rem] leading-tight sm:text-[2.3rem]">Plotëso porosinë</h1>
      <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
        Nuk ka pagesë online. Na dërgo të dhënat dhe ne të kontaktojmë për ta konfirmuar porosinë.
      </p>

      <div className="mt-10">
        {cart.items.length === 0 ? (
          <div className="border border-border bg-cream p-8">
            <p className="text-sm text-muted-foreground">
              Shporta është e zbrazët. Zgjedh një bakllavë për të vazhduar.
            </p>
            <Link
              to="/"
              hash="bakllavat"
              className="mt-5 inline-block bg-primary px-5 py-3 text-sm text-primary-foreground"
            >
              Shiko bakllavat
            </Link>
          </div>
        ) : (
          <CheckoutForm />
        )}
      </div>
    </section>
  );
}
