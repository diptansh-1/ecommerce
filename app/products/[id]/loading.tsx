import { ProductDetailSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
      <ProductDetailSkeleton />
      
      <div className="mt-16">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
