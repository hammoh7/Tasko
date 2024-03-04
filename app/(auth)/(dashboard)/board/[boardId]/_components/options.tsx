"use client";

import { deleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/actions";
import { MoreVertical, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  })

  const onDelete = () => {
    execute({ id });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="hover:bg-black/20 h-auto w-auto p-2">
          <MoreVertical className="text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-2 pb-2" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-slate-800 pb-3">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="p-2 h-auto w-auto absolute top-2 right-2 text-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-md w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          <Trash2 className="h-4 w-4 mr-3" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};
