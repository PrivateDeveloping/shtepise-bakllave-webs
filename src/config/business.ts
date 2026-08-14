/**
 * Konfigurimi qendror i biznesit.
 * Ndrysho vetëm këtë skedar për çmime, kontakt dhe dërgesa.
 *
 * TODO (zëvendëso kur t'i kesh të dhënat reale):
 *  - orderEmail: email-i ku duhet të vijnë porositë
 */
export const business = {
  name: "Bakllavë e Shtëpisë",
  tagline: "E bërë si në shtëpi, sepse bëhet në shtëpi.",
  location: "Podujevë, Kosovë",
  phone: "043 963 564",
  phoneHref: "tel:+38343963564",
  instagramHandle: "@bakllava.nga.shtepia",
  instagramUrl: "https://www.instagram.com/bakllava.nga.shtepia/",
  /** PLACEHOLDER — zëvendëso me email-in real të biznesit */
  orderEmail: "porosite@example.com",
  deliveryCities: ["Podujevë", "Prishtinë"] as const,
  deliveryFee: 0,
  leadTimeDays: 2,
} as const;

export type SizeId = "small" | "medium" | "big";

export const sizes: { id: SizeId; label: string; note: string; price: number }[] = [
  { id: "small", label: "E vogël", note: "tepsi e vogël", price: 30 },
  { id: "medium", label: "Mesatare", note: "tepsi mesatare", price: 45 },
  { id: "big", label: "E madhe", note: "tepsi e madhe", price: 55 },
];

export type ProductId = "me-arra" | "pa-arra";

export const products: {
  id: ProductId;
  name: string;
  description: string;
  image: "tray" | "closeup";
}[] = [
  {
    id: "me-arra",
    name: "Bakllavë me arra",
    description:
      "Petë të holla të bëra me dorë, arra të grira trashë mes shtresave dhe shurup i lehtë sheqeri. Bakllavaja tradicionale që e njeh nga shtëpia.",
    image: "closeup",
  },
  {
    id: "pa-arra",
    name: "Bakllavë pa arra",
    description:
      "E njëjta petë dhe i njëjti kujdes, vetëm pa arra. Më e butë dhe më e lehtë — për ata që e duan të thjeshtë.",
    image: "tray",
  },
];

export const ingredients = [
  "Vezë",
  "Kos",
  "Sheqer",
  "Gjalpë",
  "Miell",
  "Ujë",
  "Pak kripë",
  "Arra (te varianti me arra)",
];

export function priceFor(size: SizeId) {
  return sizes.find((s) => s.id === size)!.price;
}

export function sizeLabel(size: SizeId) {
  return sizes.find((s) => s.id === size)!.label;
}

export function productName(id: ProductId) {
  return products.find((p) => p.id === id)!.name;
}

export const eur = (n: number) => `${n}€`;
