"use client";

import { useState } from "react";
import Link from "next/link";
import { UserProfile, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut } from "react-icons/fi";

import Button from "@/components/ui/button";

interface ProfileClientProps {
  user: any;
}

const ProfileClient = ({ user }: ProfileClientProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FiHeart /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center mb-6">
            <UserButton afterSignOutUrl="/" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
          
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === tab.id
                    ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            
            <Link
              href="/wishlist"
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="mr-3"><FiHeart /></span>
              My Wishlist
            </Link>
            
            <button
              onClick={() => {}}
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <span className="mr-3"><FiLogOut /></span>
              Sign Out
            </button>
          </nav>
        </div>
      </div>
      
      <div className="md:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={`${user?.firstName || ""} ${user?.lastName || ""}`}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.emailAddresses[0]?.emailAddress || ""}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">
                    Edit Profile with Clerk
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order History
              </h2>
              
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 inline-flex mb-6">
                  <FiShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  When you place an order, it will appear here.
                </p>
                <Button variant="primary">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            </motion.div>
          )}
          
          {activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                My Wishlist
              </h2>
              
              <div className="text-center py-8">
                <Button variant="primary">
                  <Link href="/wishlist">Go to Wishlist</Link>
                </Button>
              </div>
            </motion.div>
          )}
          
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Account Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Notifications
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="email-notifications"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="order-updates"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label
                        htmlFor="order-updates"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Order updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="promotional-emails"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="promotional-emails"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Promotional emails
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
