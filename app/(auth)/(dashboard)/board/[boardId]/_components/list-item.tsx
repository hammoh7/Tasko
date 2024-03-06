"use client";

import { ListOfCards } from "@/types";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListOfCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[250px] select-none">
      <div className="w-full rounded-md bg-slate-300 shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};
