import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { business, priceFor, type ProductId, type SizeId } from "@/config/business";

export type CartItem = {
  productId: ProductId;
  size: SizeId;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (productId: ProductId, size: SizeId, qty?: number) => void;
  setQty: (productId: ProductId, size: SizeId, qty: number) => void;
  remove: (productId: ProductId, size: SizeId) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "bes-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((productId: ProductId, size: SizeId, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.productId === productId && it.size === size);
      if (i === -1) return [...prev, { productId, size, qty }];
      const next = [...prev];
      next[i] = { ...next[i]!, qty: next[i]!.qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((productId: ProductId, size: SizeId, qty: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.productId === productId && it.size === size ? { ...it, qty } : it))
        .filter((it) => it.qty > 0),
    );
  }, []);

  const remove = useCallback((productId: ProductId, size: SizeId) => {
    setItems((prev) => prev.filter((it) => !(it.productId === productId && it.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + priceFor(it.size) * it.qty, 0);
    return {
      items,
      add,
      setQty,
      remove,
      clear,
      count: items.reduce((s, it) => s + it.qty, 0),
      subtotal,
      total: subtotal + business.deliveryFee,
      open,
      setOpen,
    };
  }, [items, add, setQty, remove, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
