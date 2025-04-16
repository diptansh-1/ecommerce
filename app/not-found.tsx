import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-purple-600 dark:text-purple-400 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button variant="primary" size="lg" leftIcon={<FiArrowLeft />}>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
