import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(6).max(30),
  email: z.string().email().max(120).optional().or(z.literal("")),
  city: z.string().min(2).max(60),
  address: z.string().min(3).max(200),
  date: z.string().min(4).max(20),
  time: z.string().max(60),
  notes: z.string().max(500).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        name: z.string().max(80),
        size: z.string().max(40),
        qty: z.number().int().min(1).max(50),
        unitPrice: z.number().min(0).max(1000),
      }),
    )
    .min(1)
    .max(20),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { deliverOrder } = await import("./orders.server");
    const subtotal = data.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
    const reference = `BS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    await deliverOrder({
      reference,
      customer: {
        name: data.name,
        phone: data.phone,
        ...(data.email ? { email: data.email } : {}),
        city: data.city,
        address: data.address,
        date: data.date,
        time: data.time,
        ...(data.notes ? { notes: data.notes } : {}),
      },
      items: data.items,
      subtotal,
      delivery: 0,
      total: subtotal,
    });
    return { reference, subtotal, total: subtotal };
  });

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        name: z.string().min(2).max(80),
        phone: z.string().min(6).max(30),
        message: z.string().min(2).max(1000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { deliverMessage } = await import("./orders.server");
    await deliverMessage(data);
    return { ok: true };
  });
