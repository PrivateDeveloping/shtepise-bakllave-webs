import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { business, priceFor, productName, sizeLabel } from "@/config/business";
import { useCart } from "@/lib/cart";
import { submitOrder } from "@/lib/orders.functions";
import { OrderSummary } from "./OrderSummary";

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + business.leadTimeDays);
  return d.toISOString().slice(0, 10);
}

export function CheckoutForm() {
  const cart = useCart();
  const navigate = useNavigate();
  const [date, setDate] = useState(minDate());
  const [sending, setSending] = useState(false);

  return (
    <form
      className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14"
      onSubmit={async (e) => {
        e.preventDefault();
        if (cart.items.length === 0) return;
        const fd = new FormData(e.currentTarget);
        setSending(true);
        try {
          const items = cart.items.map((it) => ({
            name: productName(it.productId),
            size: sizeLabel(it.size),
            qty: it.qty,
            unitPrice: priceFor(it.size),
          }));
          const res = await submitOrder({
            data: {
              name: String(fd.get("name") ?? ""),
              phone: String(fd.get("phone") ?? ""),
              email: String(fd.get("email") ?? ""),
              city: String(fd.get("city") ?? ""),
              address: String(fd.get("address") ?? ""),
              date: String(fd.get("date") ?? ""),
              time: String(fd.get("time") ?? ""),
              notes: String(fd.get("notes") ?? ""),
              items,
            },
          });
          sessionStorage.setItem(
            "bes-last-order",
            JSON.stringify({
              reference: res.reference,
              name: String(fd.get("name") ?? ""),
              date: String(fd.get("date") ?? ""),
              total: res.total,
              items,
            }),
          );
          cart.clear();
          navigate({ to: "/faleminderit" });
        } catch {
          toast.error("Porosia nuk u dërgua. Provo përsëri ose na merr në telefon.");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Emri dhe mbiemri" name="name" required />
          <Field label="Numri i telefonit" name="phone" type="tel" required />
        </div>
        <Field label="Email (opsional)" name="email" type="email" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow">Qyteti</span>
            <select
              name="city"
              required
              defaultValue="Podujevë"
              className="mt-2 h-12 w-full border border-border bg-background px-3 text-[0.95rem] outline-none focus:border-honey"
            >
              {business.deliveryCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Tjetër">Tjetër (na kontakto)</option>
            </select>
          </label>
          <Field label="Adresa" name="address" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow">Data e dëshiruar</span>
            <input
              name="date"
              type="date"
              required
              min={minDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 h-12 w-full border border-border bg-background px-3 text-[0.95rem] outline-none focus:border-honey"
            />
            <span className="mt-2 block text-xs text-muted-foreground">
              Porositë bëhen 2–3 ditë më herët.
            </span>
          </label>
          <label className="block">
            <span className="eyebrow">Koha e dëshiruar</span>
            <select
              name="time"
              defaultValue="Pasdite (14:00–18:00)"
              className="mt-2 h-12 w-full border border-border bg-background px-3 text-[0.95rem] outline-none focus:border-honey"
            >
              <option>Paradite (09:00–13:00)</option>
              <option>Pasdite (14:00–18:00)</option>
              <option>Mbrëmje (18:00–21:00)</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="eyebrow">Shënime shtesë</span>
          <textarea
            name="notes"
            rows={4}
            className="mt-2 w-full border border-border bg-background px-3 py-3 text-[0.95rem] outline-none focus:border-honey"
          />
        </label>
      </div>

      <div className="space-y-5 md:sticky md:top-24 md:self-start">
        <OrderSummary date={date} />
        <button
          disabled={sending || cart.items.length === 0}
          className="w-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {sending ? "Duke dërguar…" : "Konfirmo Porosinë"}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Pagesa bëhet me dorëzim. Pas dërgimit ju kontaktojmë për të konfirmuar porosinë dhe kohën
          e dorëzimit.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 h-12 w-full border border-border bg-background px-3 text-[0.95rem] outline-none focus:border-honey"
      />
    </label>
  );
}
