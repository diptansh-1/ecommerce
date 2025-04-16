"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { Product } from "@/types";
import { formatPrice, truncateText } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface DraggableProductProps {
  product: Product;
}

const DraggableProduct = ({ product }: DraggableProductProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const dragRef = useRef<HTMLDivElement>(null);

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

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={`flex items-center p-2 rounded-lg cursor-grab ${
        isDragging ? "opacity-50" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      } transition-all duration-200`}
    >
      <div className="relative w-12 h-12 mr-3 rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {truncateText(product.title, 20)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatPrice(product.price)}
        </p>
      </div>
      <FiShoppingCart className="w-5 h-5 text-gray-400" />
    </div>
  );
};

export default DraggableProduct;
