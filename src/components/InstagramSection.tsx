import { business } from "@/config/business";
import { Photo } from "./Photo";

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Instagram</p>
          <h2 className="mt-3 text-[1.6rem] sm:text-[1.9rem]">Na ndiq në Instagram</h2>
        </div>
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="border-b border-honey/60 pb-1 text-sm text-foreground transition-colors hover:border-honey"
        >
          {business.instagramHandle}
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Photo name="tray" className="overflow-hidden" imgClassName="w-full object-cover aspect-square" />
        <Photo name="table" className="overflow-hidden" imgClassName="w-full object-cover aspect-square" />
        <Photo name="closeup" className="overflow-hidden" imgClassName="w-full object-cover aspect-square" />
        <Photo name="prep" className="overflow-hidden" imgClassName="w-full object-cover aspect-square" />
      </div>
    </section>
  );
}
