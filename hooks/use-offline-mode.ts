"use client";

import { useState, useEffect } from "react";
import { isOnline } from "@/lib/utils";

export function useOfflineMode() {
  const [online, setOnline] = useState(true);
  const [offlineData, setOfflineData] = useState<{
    products: any[];
    categories: string[];
  }>({
    products: [],
    categories: [],
  });

  useEffect(() => {
    // Initialize online status
    setOnline(isOnline());

    // Load cached data from localStorage
    try {
      const cachedProducts = localStorage.getItem("offline_products");
      const cachedCategories = localStorage.getItem("offline_categories");

      if (cachedProducts) {
        setOfflineData((prev) => ({
          ...prev,
          products: JSON.parse(cachedProducts),
        }));
      }

      if (cachedCategories) {
        setOfflineData((prev) => ({
          ...prev,
          categories: JSON.parse(cachedCategories),
        }));
      }
    } catch (error) {
      console.error("Error loading offline data:", error);
    }

    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setOnline(true);
      syncOfflineData();
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Function to cache data for offline use
  const cacheData = (key: string, data: any) => {
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify(data));
      setOfflineData((prev) => ({
        ...prev,
        [key]: data,
      }));
    } catch (error) {
      console.error(`Error caching ${key} data:`, error);
    }
  };

  // Function to sync offline changes when back online
  const syncOfflineData = async () => {
    // In a real app, you would:
    // 1. Check for any pending operations stored in localStorage
    // 2. Send those operations to the server
    // 3. Clear the pending operations from localStorage

    console.log("Syncing offline data...");
  };

  return {
    online,
    offlineData,
    cacheData,
    syncOfflineData,
  };
}
