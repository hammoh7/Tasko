"use client";

import { Card } from "@prisma/client";

interface CardItemsProps {
  data: Card;
  index: number;
}

export const CardItems = ({ data, index }: CardItemsProps) => {
  return (
    <div className="truncate border-2 border-transparent hover:border-black px-2 py-2 text-sm bg-white rounded-lg shadow-md">
      {data.title}
    </div>
  );
};
