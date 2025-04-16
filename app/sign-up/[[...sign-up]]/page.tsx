"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

// Document title is set in the component

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/profile';

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white dark:bg-gray-800 shadow-sm rounded-xl",
              headerTitle: "text-gray-900 dark:text-white text-2xl font-bold",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              formFieldInput: "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              footerActionLink: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
            },
          }}
          afterSignUpUrl={redirectUrl}
        />
      </div>
    </div>
  );
}
