"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SignInRedirectProps {
  redirectUrl?: string;
}

const SignInRedirect = ({ redirectUrl = "/sign-in" }: SignInRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    // Add the current URL as a redirect parameter
    const currentUrl = window.location.pathname;
    const signInUrl = `${redirectUrl}?redirect_url=${encodeURIComponent(currentUrl)}`;
    router.push(signInUrl);
  }, [router, redirectUrl]);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p className="text-gray-600 dark:text-gray-400">
        Redirecting to sign in...
      </p>
    </div>
  );
};

export default SignInRedirect;
