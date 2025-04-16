import { ProductCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
        <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
        </div>
        
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
