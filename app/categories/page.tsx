import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import { FiArrowRight } from "react-icons/fi";
import Skeleton from "@/components/ui/skeleton";

export const metadata = {
  title: "Categories | Shop",
  description: "Browse products by category",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  // Category images (in a real app, these would come from the API or database)
  const categoryImages = {
    "electronics": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "jewelery": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "men's clothing": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "women's clothing": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our products by category
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-xl" />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group relative h-64 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

              <div className="relative h-full w-full">
                <Image
                  src={categoryImages[category as keyof typeof categoryImages] || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}
                  alt={category}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <h2 className="text-2xl font-bold text-white capitalize mb-2">
                  {category}
                </h2>
                <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                  <span className="mr-2">Shop now</span>
                  <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
