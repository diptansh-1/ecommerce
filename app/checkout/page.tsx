import { Metadata } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import CheckoutClient from "./checkout-client";
import SignInRedirect from "@/components/auth/sign-in-redirect";

export const metadata: Metadata = {
  title: "Checkout | StyleShop",
  description: "Complete your purchase",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SignedIn>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>
        <CheckoutClient />
      </SignedIn>

      <SignedOut>
        <SignInRedirect redirectUrl="/sign-in" />
      </SignedOut>
    </div>
  );
}
