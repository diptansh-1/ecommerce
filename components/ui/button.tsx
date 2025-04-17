"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// No need for cn import as we're using template literals for class composition

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: "default" | "full";
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  href,
  type = "button",
  disabled = false,
  loading = false,
  isLoading = false,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = "full",
  ...props
}: ButtonProps) => {
  // Map size values for backward compatibility
  const normalizedSize = size === "sm" ? "small" : size === "md" ? "medium" : size === "lg" ? "large" : size;

  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border border-white/10 shadow-md hover:shadow-lg hover:shadow-purple-500/20",
    secondary: "bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 text-gray-900 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 dark:text-white border border-gray-300/20 dark:border-gray-600/30 shadow-sm hover:shadow-md",
    outline: "bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-700 dark:hover:border-purple-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400",
    link: "bg-transparent text-purple-600 hover:underline dark:text-purple-400 font-medium",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const roundedClasses = {
    default: "rounded-md",
    full: "rounded-full",
  };

  const baseClasses = `inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
    disabled || loading || isLoading ? "opacity-50 cursor-not-allowed" : ""
  } ${fullWidth ? "w-full" : ""} ${roundedClasses[rounded]} ${sizeClasses[normalizedSize]} ${variantClasses[variant]} ${className}`;

  // Use either loading or isLoading for backward compatibility
  const isLoadingState = loading || isLoading;

  // Use leftIcon/rightIcon or icon with iconPosition for backward compatibility
  const effectiveLeftIcon = leftIcon || (iconPosition === "left" ? icon : null);
  const effectiveRightIcon = rightIcon || (iconPosition === "right" ? icon : null);

  const content = (
    <>
      {isLoadingState && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {!isLoadingState && effectiveLeftIcon && (
        <span className="mr-2">{effectiveLeftIcon}</span>
      )}

      {children}

      {!isLoadingState && effectiveRightIcon && (
        <span className="ml-2">{effectiveRightIcon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoadingState}
      onClick={onClick}
      className={baseClasses}
      whileTap={{ scale: disabled || isLoadingState ? 1 : 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
