"use client";

import { copyList, deleteList } from "@/actions/list";
import { FormSubmit } from "@/components/form/submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/actions";
import { List } from "@prisma/client";
import { CopyIcon, MoreVertical, Trash2, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  addCard: () => void;
}

export const ListOptions = ({ data, addCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success("Deleted");
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success("Copied");
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    executeDelete({ id: data.id, boardId: data.boardId });
  };

  const onCopy = () => {
    executeCopy({ id: data.id, boardId: data.boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto p-1">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-2 pb-2"
        side="bottom"
        align="start"
        sideOffset={5}
      >
        <div className="text-sm font-medium text-center text-slate-700 pb-3">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-slate-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-4 justify-start font-normal text-sm"
          >
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-4 justify-start font-normal text-sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
