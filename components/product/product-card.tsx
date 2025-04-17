"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
// Using native HTML5 drag and drop instead of react-dnd

import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Button from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  // Setup drag and drop with native HTML5 API
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the data being dragged
    e.dataTransfer.setData("application/json", JSON.stringify(product));

    // Create a custom drag image
    const dragImage = new Image();
    dragImage.src = product.image;
    e.dataTransfer.setDragImage(dragImage, 50, 50);

    // Set other drag properties
    e.dataTransfer.effectAllowed = "copy";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 ${
        isDragging ? "opacity-50 scale-95 ring-2 ring-purple-500" : ""
      } border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-800/30 hover:translate-y-[-4px] backdrop-blur-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="absolute top-2 right-2 z-20">
            <span className="bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800 text-purple-900 dark:text-purple-100 text-xs px-3 py-1.5 rounded-full font-medium shadow-md border border-purple-300/50 dark:border-purple-600/50">
              {product.rating.rate >= 4.5 ? "Top Rated" : product.rating.rate >= 4 ? "Popular" : ""}
            </span>
          </div>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-110 transition-transform duration-500 p-4"
            priority
          />

          {/* Quick actions overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] z-10"
          >
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 shadow-md hover:shadow-lg transition-all duration-200 backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
                aria-label="Quick view"
              >
                <FiEye className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToWishlist}
                className={`p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md border border-white/20 dark:border-gray-700/30 ${
                  inWishlist
                    ? "text-red-500"
                    : "text-gray-700 dark:text-gray-200 hover:text-red-500"
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 shadow-md border border-white/20 dark:border-gray-700/30"
                aria-label="Add to cart"
              >
                <FiShoppingCart className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="p-5">
          <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/70 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3 shadow-sm border border-gray-200 dark:border-gray-700">
            {product.category}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg leading-tight hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {truncateText(product.title, 40)}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 px-3 py-1.5 rounded-full shadow-inner border border-gray-200 dark:border-gray-700">
              <span className="text-yellow-500 dark:text-yellow-400 mr-1 text-lg">★</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.rating.rate} <span className="text-gray-500 dark:text-gray-500">({product.rating.count})</span>
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <Button
          variant="primary"
          size="sm"
          className="w-full rounded-xl shadow-md hover:shadow-purple-500/30 transition-all duration-300 py-2.5 font-medium"
          leftIcon={<FiShoppingCart className="h-4 w-4" />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* Drag hint */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/20 z-20">
        <span className="flex items-center font-medium">Drag to cart <FiShoppingCart className="ml-1 h-3 w-3" /></span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
