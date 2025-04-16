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
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} products
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
              />
            </div>
          </div>

          <ProductGrid products={filteredProducts} isLoading={isLoading} />

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>

      <DroppableCart />
    </>
  );
};

export default ProductsClient;
