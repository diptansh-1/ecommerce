"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, truncateText } from "@/lib/utils";
import Button from "@/components/ui/button";

const WishlistClient = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
          <FiHeart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          Save items you love for later by clicking the heart icon on any product.
        </p>
        <Button variant="primary" size="lg">
          <Link href="/products">Explore Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
        </p>
        <button
          onClick={clearWishlist}
          className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear Wishlist
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <Link href={`/products/${product.id}`} className="block relative">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeItem(product.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </Link>
              
              <div className="p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {product.category}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {truncateText(product.title, 40)}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      {product.rating.rate}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  leftIcon={<FiShoppingCart className="h-4 w-4" />}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistClient;
