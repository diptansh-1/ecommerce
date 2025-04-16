import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import ProductsClient from "./products-client";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Products | StyleShop",
  description: "Browse our collection of high-quality products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch products and categories
  const products = await getProducts();
  const categories = await getCategories();
  
  // Get min and max prices for filter
  const prices = products.map((product) => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  
  // Get category from search params
  const categoryParam = searchParams.category as string | undefined;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
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
