export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80"></div>
        ))}
      </div>
    </div>
  );
}
