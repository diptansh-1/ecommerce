"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiWifi, FiWifiOff, FiX } from "react-icons/fi";

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    // Initialize online status
    setIsOnline(navigator.onLine);
    
    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-full shadow-lg flex items-center ${
            isOnline
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {isOnline ? (
            <FiWifi className="h-5 w-5 mr-2" />
          ) : (
            <FiWifiOff className="h-5 w-5 mr-2" />
          )}
          <span className="text-sm font-medium">
            {isOnline
              ? "You're back online! Syncing data..."
              : "You're offline. Some features may be limited."}
          </span>
          <button
            onClick={() => setShowNotification(false)}
            className="ml-3 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
          >
            <FiX className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineNotification;
