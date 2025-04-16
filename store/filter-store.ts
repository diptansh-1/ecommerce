"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SortOption = "default" | "price-low-high" | "price-high-low" | "rating" | "newest";

interface FilterState {
  category: string | null;
  priceRange: [number, number];
  sortBy: SortOption;
  searchQuery: string;
  setCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      category: null,
      priceRange: [0, 1000],
      sortBy: "default",
      searchQuery: "",
      
      setCategory: (category) => set({ category }),
      setPriceRange: (range) => set({ priceRange: range }),
      setSortBy: (option) => set({ sortBy: option }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      resetFilters: () => set({
        category: null,
        priceRange: [0, 1000],
        sortBy: "default",
        searchQuery: "",
      }),
    }),
    {
      name: "filter-storage",
    }
  )
);
