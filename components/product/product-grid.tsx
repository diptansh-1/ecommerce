"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// DndProvider is now provided at a higher level

import { Product } from "@/types";
import ProductCard from "./product-card";
import ProductQuickView from "./product-quick-view";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
      </motion.div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </>
  );
};

export default ProductGrid;
