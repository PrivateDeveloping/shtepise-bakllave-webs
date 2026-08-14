import { business } from "@/config/business";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Bakllavë e bërë në shtëpi me kujdes dhe përbërës cilësorë.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Kontakt</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <a href={business.phoneHref} className="hover:text-foreground">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {business.instagramHandle}
              </a>
            </li>
            <li>{business.location}</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Faqja</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><a href="/#bakllavat" className="hover:text-foreground">Bakllavat</a></li>
            <li><a href="/#rreth" className="hover:text-foreground">Rreth Nesh</a></li>
            <li><a href="/porosit" className="hover:text-foreground">Porosit</a></li>
            <li><a href="/#kontakt" className="hover:text-foreground">Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {business.name} — Podujevë
      </div>
    </footer>
  );
}
