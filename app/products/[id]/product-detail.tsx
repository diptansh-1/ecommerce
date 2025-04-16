"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiMinus, FiPlus, FiStar } from "react-icons/fi";

import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Button from "@/components/ui/button";
import ProductGrid from "@/components/product/product-grid";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail = ({ product, relatedProducts }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
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
    <div>
      <Link
        href="/products"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6"
      >
        <FiArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain max-h-[400px]"
            priority
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            {product.category}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating.rate) ? (
                    <FiStar className="h-5 w-5 fill-current" />
                  ) : (
                    <FiStar className="h-5 w-5" />
                  )}
                </span>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {formatPrice(product.price)}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {product.description}
          </p>
          
          <div className="flex items-center mb-8">
            <span className="text-gray-700 dark:text-gray-300 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full">
              <button
                onClick={decreaseQuantity}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
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
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              leftIcon={<FiShoppingCart className="h-5 w-5" />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className={`${
                inWishlist ? "text-red-500 border-red-500" : ""
              }`}
              leftIcon={<FiHeart className="h-5 w-5" />}
              onClick={handleAddToWishlist}
            >
              {inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
