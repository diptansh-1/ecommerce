"use client";

import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";

import { useCartStore } from "@/store/cart-store";

const CartDropZone = () => {
  const [isActive, setIsActive] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PRODUCT",
    drop: (item: any) => {
      addToCart(item.product);
      return { name: "Cart" };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  // Show the drop zone when dragging a product
  useEffect(() => {
    setIsActive(canDrop);
  }, [canDrop]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 pointer-events-auto"
        >
          <div
            ref={drop}
            className={`flex flex-col items-center justify-center w-32 h-32 rounded-full shadow-xl border-4 ${
              isOver
                ? "bg-purple-600 text-white border-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-purple-600 dark:border-purple-400"
            } transition-colors duration-200`}
          >
            <FiShoppingCart
              className={`h-10 w-10 ${
                isOver ? "animate-bounce" : ""
              }`}
            />
            <span className="text-sm font-medium mt-2 text-center">
              {isOver ? "Drop to add" : "Drag items here"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDropZone;
