import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import ProductsClient from "./products-client";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Products | Shop",
  description: "Browse our collection of high-quality products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Fetch products and categories
  const products = await getProducts();
  const categories = await getCategories();

  // Get min and max prices for filter
  const prices = products.map((product) => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  // In Next.js 15, searchParams is a Promise that needs to be awaited
  const resolvedParams = await searchParams;
  const categoryParam = resolvedParams?.category as string | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : "All Products"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of high-quality products
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <ProductsClient
          initialProducts={products}
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          initialCategory={categoryParam}
        />
      </Suspense>
    </div>
  );
}
