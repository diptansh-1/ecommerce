"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserProfile, UserButton, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiPackage, FiCalendar, FiCreditCard } from "react-icons/fi";
import { formatPrice, formatDate } from "@/lib/utils";

import Button from "@/components/ui/button";

interface SerializableUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
    isPrimary: boolean;
  }[];
  imageUrl: string;
  username: string | null;
}

interface OrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
}

interface PaymentMethod {
  type: string;
  cardName: string;
  cardNumberLast4: string;
  expiryDate: string;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: string;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileClientProps {
  user: SerializableUser | null;
}

const ProfileClient = ({ user }: ProfileClientProps) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam && ['profile', 'orders', 'wishlist', 'settings'].includes(tabParam) ? tabParam : "profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useClerk();

  // Fetch orders when the orders tab is active
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {

      setTimeout(() => {
        try {
          const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

          if (storedOrders.length === 0) {

            const mockOrder = {
              _id: 'mock123456789',
              userId: 'current_user',
              items: [
                {
                  productId: 1,
                  title: 'Sample Product',
                  price: 29.99,
                  quantity: 2,
                  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
                }
              ],
              totalAmount: 59.98,
              shippingAddress: {
                firstName: 'John',
                lastName: 'Doe',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
                country: 'USA',
                email: 'john@example.com',
                phone: '555-123-4567'
              },
              status: 'pending',
              paymentMethod: {
                type: 'credit_card',
                cardName: 'John Doe',
                cardNumberLast4: '4242',
                expiryDate: '12/25'
              },
              paymentStatus: 'paid',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            setOrders([mockOrder]);
          } else {
            setOrders(storedOrders);
          }

          setIsLoading(false);
        } catch (parseError) {
          console.error('Error parsing orders from localStorage:', parseError);
          setError('Failed to load your order history. Please try again.');
          setIsLoading(false);
        }
      }, 1000);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your order history. Please try again.');
      setIsLoading(false);
    }
  };

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
              onClick={() => signOut()}
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
                  <UserProfile routing="hash" />
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

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 inline-flex mb-6">
                    <FiShoppingBag className="h-12 w-12 text-red-500 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Error Loading Orders
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {error}
                  </p>
                  <Button variant="primary" onClick={fetchOrders}>
                    Try Again
                  </Button>
                </div>
              ) : orders.length === 0 ? (
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
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</span>
                            <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{order._id.substring(order._id.length - 8)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-gray-400 h-4 w-4" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiCreditCard className="text-gray-400 h-4 w-4" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {order.paymentMethod.type === 'credit_card' ? 'Credit Card' : order.paymentMethod.type} •••• {order.paymentMethod.cardNumberLast4}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Items</h3>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="object-contain w-full h-full"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Qty: {item.quantity} × {formatPrice(item.price)}
                                </p>
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
