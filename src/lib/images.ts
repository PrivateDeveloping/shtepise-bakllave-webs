/**
 * Fotografitë e faqes.
 * Për t'i zëvendësuar: ngarko foton e re dhe ndrysho vetëm `url` këtu.
 */
import tray from "@/assets/tray.jpg.asset.json";
import table from "@/assets/table.jpg.asset.json";
import closeup from "@/assets/closeup.jpg.asset.json";
import prep from "@/assets/prep.jpg.asset.json";

export const images = {
  tray: { url: tray.url, alt: "Tepsi e plotë me bakllavë të bërë në shtëpi" },
  table: { url: table.url, alt: "Bakllavë e shtëpisë e servirur në tavolinë" },
  closeup: { url: closeup.url, alt: "Copë bakllave me arra dhe petë të arta" },
  prep: { url: prep.url, alt: "Petët e hollura me dorë dhe përbërësit e bakllavës" },
} as const;

export type ImageKey = keyof typeof images;
