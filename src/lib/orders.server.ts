import { business } from "@/config/business";

export type OrderPayload = {
  reference: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    date: string;
    time: string;
    notes?: string;
  };
  items: { name: string; size: string; qty: number; unitPrice: number }[];
  subtotal: number;
  delivery: number;
  total: number;
};

function orderHtml(o: OrderPayload) {
  const rows = o.items
    .map(
      (i) =>
        `<tr><td>${i.name}</td><td>${i.size}</td><td>${i.qty}</td><td>${i.unitPrice}€</td><td>${
          i.qty * i.unitPrice
        }€</td></tr>`,
    )
    .join("");
  const c = o.customer;
  return `<h2>Porosi e re — ${o.reference}</h2>
<p><b>${c.name}</b> · ${c.phone}${c.email ? ` · ${c.email}` : ""}</p>
<p>${c.city}, ${c.address}</p>
<p>Data e dëshiruar: <b>${c.date}</b> ${c.time}</p>
${c.notes ? `<p>Shënime: ${c.notes}</p>` : ""}
<table border="1" cellpadding="6" cellspacing="0"><tr><th>Produkti</th><th>Madhësia</th><th>Sasia</th><th>Çmimi</th><th>Totali</th></tr>${rows}</table>
<p>Nëntotali: ${o.subtotal}€ · Dërgesa: ${o.delivery}€ · <b>Totali: ${o.total}€</b></p>`;
}

/**
 * Dërgon porosinë me email nëse RESEND_API_KEY është konfiguruar.
 * Pa çelës, porosia vetëm logohet — asnjë çelës nuk ekspozohet në frontend.
 */
export async function deliverOrder(o: OrderPayload) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["ORDER_EMAIL"] ?? business.orderEmail;
  if (!apiKey || to.endsWith("@example.com")) {
    console.info("[porosi] email nuk është konfiguruar ende:", JSON.stringify(o));
    return { emailed: false };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["ORDER_FROM"] ?? "Porosite <onboarding@resend.dev>",
      to: [to],
      subject: `Porosi e re ${o.reference} — ${o.customer.name}`,
      html: orderHtml(o),
    }),
  });
  if (!res.ok) {
    console.error("[porosi] dërgimi dështoi:", await res.text());
    return { emailed: false };
  }
  return { emailed: true };
}

export async function deliverMessage(m: { name: string; phone: string; message: string }) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["ORDER_EMAIL"] ?? business.orderEmail;
  if (!apiKey || to.endsWith("@example.com")) {
    console.info("[mesazh]", JSON.stringify(m));
    return { emailed: false };
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["ORDER_FROM"] ?? "Kontakt <onboarding@resend.dev>",
      to: [to],
      subject: `Mesazh nga faqja — ${m.name}`,
      html: `<p><b>${m.name}</b> · ${m.phone}</p><p>${m.message}</p>`,
    }),
  });
  return { emailed: true };
}
