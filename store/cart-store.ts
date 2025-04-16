"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          return set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        }
        
        set({
          items: [
            ...items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity,
            },
          ],
        });
      },
      
      removeItem: (id: number) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== id),
        });
      },
      
      updateQuantity: (id: number, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          return get().removeItem(id);
        }
        
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
