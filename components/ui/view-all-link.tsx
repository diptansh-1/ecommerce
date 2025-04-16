"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface ViewAllLinkProps {
  href: string;
  className?: string;
}

const ViewAllLink = ({ href, className = "" }: ViewAllLinkProps) => {
  return (
    <Link
      href={href}
      className={`text-purple-600 dark:text-purple-400 hover:underline flex items-center ${className}`}
    >
      View All <FiArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
};

export default ViewAllLink;
