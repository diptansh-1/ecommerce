import Link from "next/link";
import { FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";

import { getProducts, getCategories } from "@/lib/api";
import { getRandomSubset } from "@/lib/utils";
import ProductGrid from "@/components/product/product-grid";
import NewsletterForm from "@/components/newsletter-form";
import HeroSection from "@/components/home/hero-section";
import ViewAllLink from "@/components/ui/view-all-link";
import HomeClient from "./home-client";

export default async function Home() {
  // Fetch featured products and categories
  const allProducts = await getProducts();
  const featuredProducts = getRandomSubset(allProducts, 8);
  const categories = await getCategories();

  return (
    <HomeClient>
      <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <FiTruck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Free shipping on all orders over $50</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <FiStar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Curated selection of high-quality products</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <FiShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
          <ViewAllLink href="/products" />
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group relative h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-medium capitalize">{category}</h3>
              </div>
              <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section>
        <NewsletterForm />
      </section>
      </div>
    </HomeClient>
  );
}
