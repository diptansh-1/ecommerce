"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
  animation?: "pulse" | "wave" | "none";
}

const Skeleton = ({
  className,
  variant = "rectangular",
  animation = "pulse",
  ...props
}: SkeletonProps) => {
  const baseStyles = "bg-gray-200 dark:bg-gray-700";
  
  const variants = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded h-4 w-full",
  };
  
  const animations = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton variant="text" className="h-4 w-2/3" />
      <Skeleton variant="text" className="h-4 w-1/2" />
      <Skeleton variant="text" className="h-4 w-1/4" />
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Skeleton className="h-96 w-full" />
      <div className="flex flex-col space-y-4">
        <Skeleton variant="text" className="h-8 w-3/4" />
        <Skeleton variant="text" className="h-6 w-1/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-3/4" />
        <div className="flex space-x-4 pt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};
