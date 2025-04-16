"use client";

import { motion } from "framer-motion";
import { FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useNewsletter } from "@/hooks/use-newsletter";
import Button from "@/components/ui/button";

const NewsletterForm = () => {
  const { email, setEmail, status, message, subscribe } = useNewsletter();
  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-6">
            <FiMail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stay updated with our latest products and exclusive offers.
          </p>
          
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={status === "loading"}
              />
              
              {status === "success" && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiCheck className="h-5 w-5 text-green-500" />
                </div>
              )}
              
              {status === "error" && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={status === "loading"}
            >
              Subscribe
            </Button>
          </form>
          
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 text-sm ${
                status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterForm;
