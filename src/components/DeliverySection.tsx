const steps = [
  {
    n: "1",
    title: "Zgjidh bakllavën",
    text: "Me arra ose pa arra, dhe zgjedh madhësinë e tepsisë.",
  },
  {
    n: "2",
    title: "Plotëso porosinë",
    text: "Na lë emrin, numrin, adresën dhe ditën kur e do bakllavën.",
  },
  {
    n: "3",
    title: "Ne e përgatisim",
    text: "E bëjmë të freskët për ditën tënde dhe ta sjellim në derë.",
  },
];

export function DeliverySection() {
  return (
    <section className="border-y border-border/70 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="eyebrow">Si porositet</p>
        <h2 className="mt-3 max-w-lg text-[1.8rem] leading-tight sm:text-[2.15rem]">
          Tri hapa, pa komplikime.
        </h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="font-serif text-2xl text-honey">{s.n}</span>
              <h3 className="mt-2 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 space-y-1 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground">Porosit 2 deri në 3 ditë më herët</span> — bakllavaja
            bëhet posaçërisht për ty.
          </p>
          <p>
            <span className="text-foreground">Dërgesa është falas</span> në Podujevë dhe Prishtinë.
          </p>
        </div>
      </div>
    </section>
  );
}
