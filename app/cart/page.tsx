import { Metadata } from "next";
import CartClient from "./cart-client";

export const metadata: Metadata = {
  title: "Shopping Cart | StyleShop",
  description: "View and manage your shopping cart",
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart
      </h1>
      
      <CartClient />
    </div>
  );
}
