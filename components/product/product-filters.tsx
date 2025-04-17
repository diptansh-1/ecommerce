"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

import { useFilterStore } from "@/store/filter-store";
import Button from "@/components/ui/button";

interface ProductFiltersProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

const ProductFilters = ({
  categories,
  minPrice,
  maxPrice,
}: ProductFiltersProps) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  });

  const {
    category,
    priceRange,
    sortBy,
    setCategory,
    setPriceRange,
    setSortBy,
    resetFilters,
  } = useFilterStore();


  useEffect(() => {
    if (priceRange[0] === 0 && priceRange[1] === 1000) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, priceRange, setPriceRange]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange as [number, number]);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button
          id="mobile-filter-button"
          variant="outline"
          leftIcon={<FiFilter className="h-4 w-4" />}
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          Filters
        </Button>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block sticky top-24 h-fit">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Reset
            </Button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => toggleSection("categories")}
            >
              Categories
              <FiChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedSections.categories ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.categories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 mt-2">
                    <div
                      className={`flex items-center cursor-pointer ${
                        category === null
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                      onClick={() => setCategory(null)}
                    >
                      <span className="text-sm">All Categories</span>
                    </div>
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className={`flex items-center cursor-pointer ${
                          category === cat
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                        onClick={() => setCategory(cat)}
                      >
                        <span className="text-sm capitalize">{cat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => toggleSection("price")}
            >
              Price Range
              <FiChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedSections.price ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.price && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className="absolute h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                        style={{
                          left: `${
                            ((priceRange[0] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                          right: `${
                            100 -
                            ((priceRange[1] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="min-price"
                          className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                        >
                          Min Price
                        </label>
                        <input
                          type="range"
                          id="min-price"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceChange(0, Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="max-price"
                          className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                        >
                          Max Price
                        </label>
                        <input
                          type="range"
                          id="max-price"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceChange(1, Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort By */}
          <div>
            <button
              className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              onClick={() => toggleSection("sort")}
            >
              Sort By
              <FiChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedSections.sort ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.sort && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 mt-2">
                    {[
                      { value: "default", label: "Default" },
                      { value: "price-low-high", label: "Price: Low to High" },
                      { value: "price-high-low", label: "Price: High to Low" },
                      { value: "rating", label: "Rating" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center cursor-pointer p-2 rounded-lg ${
                          sortBy === option.value
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSortBy(option.value as any)}
                      >
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileFiltersOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto border-l border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center cursor-pointer ${
                        category === null
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                      onClick={() => setCategory(null)}
                    >
                      <span className="text-sm">All Categories</span>
                    </div>
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className={`flex items-center cursor-pointer ${
                          category === cat
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                        onClick={() => setCategory(cat)}
                      >
                        <span className="text-sm capitalize">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Price Range
                  </h4>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className="absolute h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                        style={{
                          left: `${
                            ((priceRange[0] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                          right: `${
                            100 -
                            ((priceRange[1] - minPrice) /
                              (maxPrice - minPrice)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="mobile-min-price"
                          className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                        >
                          Min Price
                        </label>
                        <input
                          type="range"
                          id="mobile-min-price"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceChange(0, Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="mobile-max-price"
                          className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                        >
                          Max Price
                        </label>
                        <input
                          type="range"
                          id="mobile-max-price"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceChange(1, Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Sort By
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: "default", label: "Default" },
                      { value: "price-low-high", label: "Price: Low to High" },
                      { value: "price-high-low", label: "Price: High to Low" },
                      { value: "rating", label: "Rating" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center cursor-pointer p-2 rounded-lg ${
                          sortBy === option.value
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSortBy(option.value as any)}
                      >
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resetFilters();
                      setIsMobileFiltersOpen(false);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;
