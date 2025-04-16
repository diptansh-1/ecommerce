"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import Button from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 mb-6">
        <FiAlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Something went wrong!
      </h1>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="primary"
          size="lg"
          leftIcon={<FiRefreshCw />}
          onClick={reset}
        >
          Try Again
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          leftIcon={<FiArrowLeft />}
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      
      {error.digest && (
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
