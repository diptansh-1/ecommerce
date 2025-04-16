"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500 mb-16">
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
        <div className="text-white max-w-xl mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Premium Shopping Experience
          </h1>
          <p className="text-lg mb-8 text-white/90">
            Explore our curated collection of high-quality products with an intuitive shopping interface and seamless checkout process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              rightIcon={<FiArrowRight />}
            >
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 h-64 md:h-96">
          <Image
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="Featured Product"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
