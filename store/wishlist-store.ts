"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        
        if (!existingItem) {
          set({
            items: [...items, product],
          });
        }
      },
      
      removeItem: (id: number) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== id),
        });
      },
      
      isInWishlist: (id: number) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
