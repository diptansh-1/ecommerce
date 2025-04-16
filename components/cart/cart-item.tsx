"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

import { CartItem as CartItemType } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center py-4 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      <div className="ml-4 flex-1">
        <Link
          href={`/products/${item.id}`}
          className="text-sm font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        >
          {truncateText(item.title, 40)}
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {formatPrice(item.price)}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Subtotal: {formatPrice(item.price * item.quantity)}
          </div>

          <button
            onClick={handleRemove}
            className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
