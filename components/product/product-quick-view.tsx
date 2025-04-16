"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiHeart, FiShoppingCart } from "react-icons/fi";

import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Button from "@/components/ui/button";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="min-h-screen px-4 flex items-center justify-center">

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/90 rounded-2xl shadow-xl max-w-3xl w-full mx-auto overflow-hidden border border-gray-200/80 dark:border-gray-800/80 backdrop-blur-sm">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-80 md:h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 flex items-center justify-center p-8 border-r border-gray-200/50 dark:border-gray-700/50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-contain max-h-full"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/70 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                    {product.category}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                    {product.title}
                  </h2>

                  <div className="inline-flex items-center mb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 px-4 py-2 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating.rate) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.rating.rate} <span className="text-gray-400 dark:text-gray-500">({product.rating.count} reviews)</span>
                    </span>
                  </div>

                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 mb-5">
                    {formatPrice(product.price)}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {truncateText(product.description, 150)}
                  </p>

                  <div className="flex items-center mb-6">
                    <span className="text-gray-700 dark:text-gray-300 mr-4 font-medium">Quantity:</span>
                    <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-700/30 p-1 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                        disabled={quantity <= 1}
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center text-gray-900 dark:text-white font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Button
                      variant="primary"
                      className="flex-1 shadow-md hover:shadow-purple-500/30 transition-all duration-300 py-2.5 rounded-xl"
                      leftIcon={<FiShoppingCart className="h-5 w-5" />}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      className={`${
                        inWishlist ? "text-red-500 border-red-500" : ""
                      }`}
                      leftIcon={<FiHeart className="h-5 w-5" />}
                      onClick={handleAddToWishlist}
                    >
                      {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                    </Button>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 text-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductQuickView;
