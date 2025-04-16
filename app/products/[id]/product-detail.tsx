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
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 group transition-all duration-200 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-800/20 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50"
      >
        <FiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-800 dark:text-purple-300 text-xs px-4 py-2 rounded-full font-medium shadow-sm backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30">
              {product.rating.rate >= 4.5 ? "Top Rated" : product.rating.rate >= 4 ? "Popular" : ""}
            </span>
          </div>
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
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/70 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            {product.category}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
            {product.title}
          </h1>

          <div className="inline-flex items-center mb-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 px-4 py-2 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50">
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
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {product.rating.rate} <span className="text-gray-500 dark:text-gray-400">({product.rating.count} reviews)</span>
            </span>
          </div>

          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 mb-6">
            {formatPrice(product.price)}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-800/20 rounded-xl p-5 mb-8 shadow-inner border border-gray-200/50 dark:border-gray-700/30">
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>

          <div className="flex items-center mb-8">
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

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 shadow-md hover:shadow-purple-500/30 transition-all duration-300 py-3 rounded-xl"
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Related Products
            </h2>
            <Link
              href={`/products?category=${product.category}`}
              className="text-purple-600 dark:text-purple-400 hover:underline flex items-center text-sm font-medium"
            >
              View All <FiArrowLeft className="ml-1 h-4 w-4 rotate-180" />
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
