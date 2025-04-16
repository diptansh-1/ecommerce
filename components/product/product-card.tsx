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
      className={`group relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 ${
        isDragging ? "opacity-50 scale-95 ring-2 ring-purple-500" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            priority
          />

          {/* Quick actions overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                aria-label="Quick view"
              >
                <FiEye className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToWishlist}
                className={`p-2 bg-white dark:bg-gray-800 rounded-full ${
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
                className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                aria-label="Add to cart"
              >
                <FiShoppingCart className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            {truncateText(product.title, 40)}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          leftIcon={<FiShoppingCart className="h-4 w-4" />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* Drag hint */}
      <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
        <span className="flex items-center">Drag to cart <FiShoppingCart className="ml-1 h-3 w-3" /></span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
