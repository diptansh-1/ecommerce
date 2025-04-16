import { Metadata } from "next";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ProfileClient from "./profile-client";
import SignInRedirect from "@/components/auth/sign-in-redirect";

export const metadata: Metadata = {
  title: "My Profile | StyleShop",
  description: "Manage your account and view your order history",
};

export default async function ProfilePage() {
  const user = await currentUser();

  // Create a serializable user object with only the properties we need
  const serializableUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map(email => ({
      id: email.id,
      emailAddress: email.emailAddress,
      // Check if this is the primary email
      isPrimary: user.primaryEmailAddressId === email.id
    })),
    imageUrl: user.imageUrl,
    username: user.username
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedIn>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Profile
        </h1>
        <ProfileClient user={serializableUser} />
      </SignedIn>

      <SignedOut>
        <SignInRedirect redirectUrl="/sign-in" />
      </SignedOut>
    </div>
  );
}
