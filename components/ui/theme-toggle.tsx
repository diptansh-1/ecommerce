"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>;
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <motion.div
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiSun className="h-5 w-5 text-yellow-400" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiMoon className="h-5 w-5 text-gray-700" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
