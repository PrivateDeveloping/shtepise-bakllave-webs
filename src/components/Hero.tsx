import { Link } from "@tanstack/react-router";
import { Photo } from "./Photo";
import { business } from "@/config/business";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:pt-16 sm:pb-20">
      <div className="grid items-end gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
        <div className="md:pb-6">
          <p className="eyebrow">Podujevë · Prishtinë</p>
          <h1 className="mt-4 text-[2.1rem] leading-[1.12] text-foreground sm:text-[2.7rem] md:text-[3rem]">
            Bakllavë e bërë në shtëpi,
            <br className="hidden sm:block" /> me shije tradicionale.
          </h1>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted-foreground">
            Bakllavë e përgatitur me kujdes, përbërës cilësorë dhe shije të shtëpisë. Dërgesa falas
            në Podujevë dhe Prishtinë.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/porosit"
              className="bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Porosit Tani
            </Link>
            <a
              href="#bakllavat"
              className="border-b border-honey/60 px-1 py-3 text-sm text-foreground transition-colors hover:border-honey"
            >
              Shiko Bakllavat
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Dërgesa falas në {business.deliveryCities.join(" dhe ")} · Porosit 2–3 ditë më herët
          </p>
        </div>

        <figure className="relative">
          <Photo
            name="tray"
            priority
            width={720}
            height={800}
            className="overflow-hidden bg-cream"
            imgClassName="w-full object-cover aspect-[4/5] sm:aspect-[5/5]"
          />
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Tepsi e sapodalë nga furra — e prerë me dorë.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
