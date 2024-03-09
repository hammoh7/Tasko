"use client";

import { updateCard } from "@/actions/card";
import { FormInput } from "@/components/form/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/actions";
import { CardsOfList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutGrid } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  data: CardsOfList;
}

export const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["card", data.id]
        })
        toast.success("Renamed");
        setTitle(data.title);
    },
    onError: (error) => {
        toast.error(error);
    }
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) {
        return;
    }

    execute({
        title, 
        boardId, 
        id: data.id,
    })
  }

  return (
    <div className="flex items-start gap-x-3 mb-5 w-full">
      <LayoutGrid className="h-5 w-5 mt-1 text-slate-800" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-slate-800 bg-transparent border-transparent relative -left-1 w-[90%] focus-visible:bg-white focus-visible:border-input truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground"><span className="underline">{data.list.title}</span></p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-5">
      <Skeleton className="h-5 w-5 bg-slate-300" />
      <div>
        <Skeleton className="w-24 h-5 mb-1 bg-slate-300" />
        <Skeleton className="w-24 h-5 mb-1 bg-slate-300" />
      </div>
    </div>
  );
};
