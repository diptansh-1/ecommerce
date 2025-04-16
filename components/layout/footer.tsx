"use client";

import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">StyleShop</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your one-stop shop for trendy fashion and accessories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                123 Fashion Street
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                New York, NY 10001
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                contact@styleshop.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} StyleShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
