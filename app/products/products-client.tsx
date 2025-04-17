"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// DndProvider is now provided at the root level

import { Product } from "@/types";
import { useFilterStore } from "@/store/filter-store";
import ProductGrid from "@/components/product/product-grid";
import ProductFilters from "@/components/product/product-filters";
import DroppableCart from "@/components/cart/droppable-cart";

interface ProductsClientProps {
  initialProducts: Product[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  initialCategory?: string;
}

const ProductsClient = ({
  initialProducts,
  categories,
  minPrice,
  maxPrice,
  initialCategory,
}: ProductsClientProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Use a ref to track the current URL to prevent infinite loops
  const currentUrlRef = useRef<string>("");

  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    category,
    priceRange,
    sortBy,
    searchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    setSearchQuery,
  } = useFilterStore();

  // Initialize filters from URL params
  useEffect(() => {
    // Set the current URL ref on first render
    if (isFirstRender.current) {
      currentUrlRef.current = window.location.search;
      isFirstRender.current = false;
    }
    if (initialCategory) {
      setCategory(initialCategory);
    }

    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }

    const sort = searchParams.get("sort") as any;
    if (sort) {
      setSortBy(sort);
    }

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    if (minPriceParam && maxPriceParam) {
      setPriceRange([Number(minPriceParam), Number(maxPriceParam)]);
    } else {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [initialCategory, searchParams, setCategory, setSearchQuery, setSortBy, setPriceRange, minPrice, maxPrice]);

  // Apply filters and sorting without updating URL
  useEffect(() => {

    setIsLoading(true);

    // Filter by category
    let result = [...initialProducts];
    if (category) {
      result = result.filter((product) => product.category === category);
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(result);
    setIsLoading(false);
  }, [category, priceRange, sortBy, searchQuery, initialProducts]);

  // Separate effect for URL updates to prevent infinite loops
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) return;

    // Build the new URL
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchQuery) params.set("q", searchQuery);
    if (sortBy !== "default") params.set("sort", sortBy);
    if (priceRange[0] !== minPrice) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] !== maxPrice) params.set("maxPrice", priceRange[1].toString());

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    const fullNewUrl = `/products${newUrl}`;

    // Only update if the URL has actually changed
    if (currentUrlRef.current !== newUrl) {
      currentUrlRef.current = newUrl;
      router.push(fullNewUrl, { scroll: false });
    }
  }, [category, priceRange, sortBy, searchQuery, router, minPrice, maxPrice]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <ProductFilters
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <p className="text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
                Showing <span className="font-bold text-purple-600 dark:text-purple-400">{filteredProducts.length}</span> products
              </p>

              {/* Sort dropdown - always accessible */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none pr-8 cursor-pointer"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64 shadow-inner"
              />
            </div>
          </div>

          <ProductGrid products={filteredProducts} isLoading={isLoading} />

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your filters or search query to find what you're looking for
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating filter button for mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => document.getElementById('mobile-filter-button')?.click()}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center border border-white/10"
          aria-label="Open filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      <DroppableCart />
    </>
  );
};

export default ProductsClient;
