"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
// DndProvider is now provided at the root level

import { useCartStore } from "@/store/cart-store";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import Button from "@/components/ui/button";

const CartClient = () => {
  const { items } = useCartStore();
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
          <FiShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          Looks like you haven't added any products to your cart yet.
          Browse our collection and find something you'll love!
        </p>
        <Button variant="primary" size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartClient;
