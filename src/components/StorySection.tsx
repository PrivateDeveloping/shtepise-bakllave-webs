import { Photo } from "./Photo";

export function StorySection() {
  return (
    <section id="rreth" className="scroll-mt-20 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:py-24">
        <Photo
          name="table"
          className="overflow-hidden"
          imgClassName="w-full object-cover aspect-[4/3]"
        />
        <div>
          <p className="eyebrow">Rreth nesh</p>
          <h2 className="mt-3 text-[1.8rem] leading-tight sm:text-[2.15rem]">
            E bërë si në shtëpi, sepse bëhet në shtëpi.
          </h2>
          <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p>
              Çdo tepsi bëhet në kuzhinën tonë, jo në fabrikë. Petët hollohen me dorë, shtresat
              vendosen një nga një dhe piqen derisa të marrin ngjyrë të artë.
            </p>
            <p>
              Shurupi hidhet në kohën e duhur që bakllavaja të mbetet e freskët dhe jo e rëndë.
              Arrat i thyejmë vetë kur porosia është me arra. Punojmë me porosi, prandaj çdo tepsi
              del e sapopërgatitur.
            </p>
          </div>
          <p className="mt-6 font-serif text-lg text-foreground">
            Sa më shumë kujdes në petë, aq më e mirë bakllavaja.
          </p>
        </div>
      </div>
    </section>
  );
}
