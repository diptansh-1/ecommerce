"use client";

import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900/90 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent flex items-center"
            >
              <span className="mr-2 bg-gradient-to-br from-purple-600 to-blue-500 p-2 rounded-xl text-white shadow-md flex items-center justify-center w-9 h-9 border border-white/20">S</span>
              Shop
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              A sophisticated e-commerce web application offering a premium shopping experience.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50"
              >
                <FiFacebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50"
              >
                <FiTwitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50"
              >
                <FiInstagram className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 relative inline-block">
              Shop
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-full"></span>
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover:translate-x-1 inline-flex items-center"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 relative inline-block">
              Account
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-full"></span>
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=orders"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-full"></span>
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiMapPin className="h-4 w-4 mr-2" />
                <span>123 Fashion Street, Style City</span>
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiPhone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiMail className="h-4 w-4 mr-2" />
                <span>support@styleshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 p-4 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Shop. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
