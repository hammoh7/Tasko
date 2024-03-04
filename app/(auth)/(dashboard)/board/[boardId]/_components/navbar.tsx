import { Board } from "@prisma/client";
import { BoardTitle } from "./title";
import { BoardOptions } from "./options";

interface BoardNavProps {
  data: Board;
}

export const BoardNav = ({ data }: BoardNavProps) => {
  return (
    <div className="w-full h-14 z-[30] bg-black/30 fixed top-14 flex items-center px-5 gap-x-4 text-white">
      <BoardTitle data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
