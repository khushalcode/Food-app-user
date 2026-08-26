/**
 * Minimal global cart store using React context + useSyncExternalStore.
 * Keeps the app dependency-light; no Redux needed.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AsyncStorage } from '../utils/asyncStorage';
import { Item } from '../data/mock';

export type CartLine = { item: Item; qty: number };
export type CartState = {
  storeId: string | null;
  storeName: string | null;
  lines: CartLine[];
};

const CART_KEY = '@blinksy/cart';

type CartCtx = {
  state: CartState;
  add: (item: Item, storeId: string, storeName: string) => void;
  remove: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ storeId: null, storeName: null, lines: [] });

  useEffect(() => {
    AsyncStorage.getItem<CartState>(CART_KEY).then((saved) => {
      if (saved && Array.isArray(saved.lines)) setState(saved);
    });
  }, []);

  const persist = useCallback((next: CartState) => {
    setState(next);
    AsyncStorage.setItem(CART_KEY, next).catch(() => {});
  }, []);

  const add: CartCtx['add'] = (item, storeId, storeName) => {
    setState((prev) => {
      // If user adds from a different store, clear cart (matches app behavior).
      let next: CartState = prev;
      if (prev.storeId && prev.storeId !== storeId) {
        next = { storeId, storeName, lines: [] };
      } else {
        next = { ...prev, storeId, storeName };
      }
      const existing = next.lines.find((l) => l.item.id === item.id);
      if (existing) {
        next.lines = next.lines.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l));
      } else {
        next.lines = [...next.lines, { item, qty: 1 }];
      }
      AsyncStorage.setItem(CART_KEY, next).catch(() => {});
      return next;
    });
  };

  const remove: CartCtx['remove'] = (itemId) => {
    setState((prev) => {
      const next = { ...prev, lines: prev.lines.filter((l) => l.item.id !== itemId) };
      if (next.lines.length === 0) {
        next.storeId = null;
        next.storeName = null;
      }
      AsyncStorage.setItem(CART_KEY, next).catch(() => {});
      return next;
    });
  };

  const setQty: CartCtx['setQty'] = (itemId, qty) => {
    setState((prev) => {
      let lines = prev.lines;
      if (qty <= 0) {
        lines = prev.lines.filter((l) => l.item.id !== itemId);
      } else {
        lines = prev.lines.map((l) => (l.item.id === itemId ? { ...l, qty } : l));
      }
      const next: CartState = { ...prev, lines };
      if (next.lines.length === 0) {
        next.storeId = null;
        next.storeName = null;
      }
      AsyncStorage.setItem(CART_KEY, next).catch(() => {});
      return next;
    });
  };

  const clear: CartCtx['clear'] = () => {
    const next: CartState = { storeId: null, storeName: null, lines: [] };
    persist(next);
  };

  const count = state.lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = state.lines.reduce((s, l) => s + l.item.price * l.qty, 0);

  return (
    <CartContext.Provider value={{ state, add, remove, setQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
