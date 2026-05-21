import { Backpack, BookOpen, Pencil } from "lucide-react";
import React from "react";

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case "backpack":
      return <Backpack size={28} />;
    case "book":
      return <BookOpen size={28} />;
    case "pencil":
      return <Pencil size={28} />;
    default:
      return <BookOpen size={28} />;
  }
};

export const getBgClass = (index: number) => {
  switch (index) {
    case 0:
      return "bg-rose-50 text-rose-600";
    case 1:
      return "bg-indigo-50 text-indigo-600";
    case 2:
      return "bg-amber-50 text-amber-600";
    default:
      return "bg-slate-50 text-slate-600";
  }
};
