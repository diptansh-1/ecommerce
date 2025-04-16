import { Metadata } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import WishlistClient from "./wishlist-client";
import SignInRedirect from "@/components/auth/sign-in-redirect";

export const metadata: Metadata = {
  title: "Wishlist | StyleShop",
  description: "View and manage your wishlist",
};

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SignedIn>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Wishlist
        </h1>
        <WishlistClient />
      </SignedIn>

      <SignedOut>
        <SignInRedirect redirectUrl="/sign-in" />
      </SignedOut>
    </div>
  );
}
