"use client";

import { ReactNode } from "react";
import DroppableCart from "@/components/cart/droppable-cart";

interface HomeClientProps {
  children: ReactNode;
}

const HomeClient = ({ children }: HomeClientProps) => {
  return (
    <>
      {children}
      <DroppableCart />
    </>
  );
};

export default HomeClient;
