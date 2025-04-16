"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { debounce } from "@/lib/utils";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  
  const handleSearch = debounce((value: string) => {
    if (value.trim()) {
      router.push(`/products?q=${encodeURIComponent(value.trim())}`);
      setIsOpen(false);
    }
  }, 300);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
        aria-label="Search"
      >
        <FiSearch className="h-5 w-5" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-4 pl-12 text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none text-lg"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </form>
              
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Press Enter to search
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
