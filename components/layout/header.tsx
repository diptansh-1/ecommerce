"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import ThemeToggle from "@/components/ui/theme-toggle";
import Search from "@/components/ui/search";
import { useCartStore } from "@/store/cart-store";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent flex items-center gap-2"
        >
          <span className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-purple-400/20 blur-sm"></span>
            <span className="relative">Style</span>
          </span>
          <span>Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              }`}
            >
              <span className="relative py-2">
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Search />
          <ThemeToggle />

          <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-secondary text-foreground/80 hover:text-primary transition-colors">
            <FiHeart className="h-5 w-5" />
          </Link>

          <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary text-foreground/80 hover:text-primary transition-colors">
            <FiShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full shadow-sm">
                {cartItems.length}
              </span>
            )}
          </Link>

          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="btn-primary rounded-full"
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/profile"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors mr-2"
            >
              Profile
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Search />
          <ThemeToggle />

          <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary text-foreground/80 hover:text-primary transition-colors">
            <FiShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full shadow-sm">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-secondary text-foreground/80 hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border shadow-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${
                    pathname === link.href
                      ? "text-primary bg-secondary/50 font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md flex items-center gap-2"
              >
                <FiHeart className="h-4 w-4" />
                Wishlist
              </Link>

              <SignedIn>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md flex items-center gap-2"
                >
                  <FiUser className="h-4 w-4" />
                  Profile
                </Link>
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col space-y-2">
                  <SignInButton mode="modal">
                    <button className="w-full px-4 py-2 text-sm font-medium btn-secondary rounded-full">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full px-4 py-2 text-sm font-medium btn-primary rounded-full">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
