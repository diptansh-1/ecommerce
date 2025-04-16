"use client";

import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";

const DroppableCart = () => {
  const [isOver, setIsOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent default to allow drop
    e.preventDefault();
    setIsOver(true);
    setIsVisible(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
    setIsVisible(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
    // Don't hide immediately to prevent flickering
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      // Get the product data from the drag event
      const productData = e.dataTransfer.getData("application/json");
      if (productData) {
        const product = JSON.parse(productData) as Product;
        addToCart(product);

        // Show success animation
        setIsOver(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error parsing product data:", error);
    }
  };

  // Listen for drag events on the document to show the drop zone
  useEffect(() => {
    const handleDocumentDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsVisible(true);
    };

    // Add event listeners for drag events
    document.addEventListener("dragover", handleDocumentDragOver);

    // Store the reference to the drag event handlers
    const handleDragStart = () => setIsVisible(true);
    const handleDragEnd = () => {
      setIsOver(false);
      setTimeout(() => setIsVisible(false), 500);
    };

    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("dragover", handleDocumentDragOver);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 pointer-events-auto"
        >
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-32 h-32 rounded-full shadow-xl border-4 ${
              isOver
                ? "bg-purple-600 text-white border-white scale-110"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-purple-600 dark:border-purple-400"
            } transition-all duration-200`}
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

export default DroppableCart;
