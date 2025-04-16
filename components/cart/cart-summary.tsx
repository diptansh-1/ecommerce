"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCreditCard } from "react-icons/fi";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/button";

const CartSummary = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const subtotal = getTotalPrice();
  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    router.push("/checkout");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Order Summary
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {items.length > 0 ? formatPrice(shipping) : "Free"}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {formatPrice(tax)}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-900 dark:text-white font-semibold">
              Total
            </span>
            <span className="text-gray-900 dark:text-white font-semibold">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          leftIcon={<FiCreditCard className="h-5 w-5" />}
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          leftIcon={<FiShoppingBag className="h-5 w-5" />}
          onClick={() => router.push("/products")}
        >
          Continue Shopping
        </Button>
        
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="w-full text-center text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 mt-2"
          >
            Clear Cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CartSummary;
