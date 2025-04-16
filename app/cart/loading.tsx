export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
        </div>
      </div>
    </div>
  );
}
