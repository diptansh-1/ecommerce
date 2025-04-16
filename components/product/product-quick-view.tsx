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
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-auto overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-80 md:h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-contain max-h-full"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {product.category}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {product.title}
                  </h2>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating.rate) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      ({product.rating.count} reviews)
                    </span>
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {formatPrice(product.price)}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {truncateText(product.description, 150)}
                  </p>

                  <div className="flex items-center mb-6">
                    <span className="text-gray-700 dark:text-gray-300 mr-4">Quantity:</span>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        disabled={quantity <= 1}
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-gray-900 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Button
                      variant="primary"
                      className="flex-1"
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
