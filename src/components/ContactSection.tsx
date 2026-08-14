import { useState } from "react";
import { toast } from "sonner";
import { business } from "@/config/business";
import { sendMessage } from "@/lib/orders.functions";

export function ContactSection() {
  const [sending, setSending] = useState(false);

  return (
    <section id="kontakt" className="scroll-mt-20 border-t border-border/70 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2 className="mt-3 text-[1.8rem] leading-tight sm:text-[2.15rem]">
            Na shkruaj ose merr në telefon.
          </h2>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="eyebrow">Telefoni</dt>
              <dd className="mt-1">
                <a href={business.phoneHref} className="text-foreground hover:text-honey">
                  {business.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-honey"
                >
                  {business.instagramHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Vendndodhja</dt>
              <dd className="mt-1 text-foreground">{business.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Dërgesa</dt>
              <dd className="mt-1 text-foreground">Podujevë dhe Prishtinë — falas</dd>
            </div>
          </dl>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const form = e.currentTarget;
            setSending(true);
            try {
              await sendMessage({
                data: {
                  name: String(fd.get("name") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  message: String(fd.get("message") ?? ""),
                },
              });
              toast.success("Mesazhi u dërgua. Ju kontaktojmë së shpejti.");
              form.reset();
            } catch {
              toast.error("Diçka shkoi keq. Provo përsëri ose na merr në telefon.");
            } finally {
              setSending(false);
            }
          }}
        >
          <Field label="Emri" name="name" required />
          <Field label="Telefoni" name="phone" type="tel" required />
          <label className="block">
            <span className="eyebrow">Mesazhi</span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full border border-border bg-background px-3 py-3 text-[0.95rem] outline-none focus:border-honey"
            />
          </label>
          <button
            disabled={sending}
            className="bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Duke dërguar…" : "Dërgo mesazhin"}
          </button>
        </form>
      </div>
    </section>
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
