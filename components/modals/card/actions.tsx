"use client";

import { copyCard, deleteCard } from "@/actions/card";
import { Label } from "@/components/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/actions";
import { useCardModal } from "@/hooks/card-modal";
import { cn } from "@/lib/utils";
import { CardsOfList } from "@/types";
import { CopyIcon, MoreVertical, Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionProps {
  data: CardsOfList;
}

export const Actions = ({ data }: ActionProps) => {
  const { execute: executeCopyCard, isLoading: isCopyLoading } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success("Copied");
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isDeleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success("Deleted");
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const params = useParams();
  const cardModal = useCardModal();

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-1 ml-auto">
      <Popover>
        <Label description="Actions" side="right" sideOffset={10}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-auto w-auto p-1">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </Label>
        <PopoverContent
          className={cn("px-0 pt-2 pb-2 w-36")}
          side="bottom"
          align="start"
          sideOffset={5}
        >
          <Button
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-4 justify-start font-normal text-sm"
            onClick={onCopy}
            disabled={isCopyLoading}
          >
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Separator />
          <Button
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-4 justify-start font-normal text-sm"
            onClick={onDelete}
            disabled={isDeleteLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-2 h-2 bg-slate-300" />
    </div>
  );
};
