"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";

interface DndProviderProps {
  children: ReactNode;
}

export function DndProviderWrapper({ children }: DndProviderProps) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
