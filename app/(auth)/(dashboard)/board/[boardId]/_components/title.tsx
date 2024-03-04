"use client";

import { updateBoard } from "@/actions/board";
import { FormInput } from "@/components/form/input";
import { Label } from "@/components/label";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/actions";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleProps {
  data: Board;
}

export const BoardTitle = ({ data }: BoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success("Board name updated!");
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[5px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <div>
      <Label description="Rename" side="right" sideOffset={10}>
        <Button
          onClick={enableEditing}
          variant="ghost"
          className="font-bold text-lg h-auto w-auto p-1 px-2 hover:bg-white/20 hover:text-white"
        >
          {title}
        </Button>
      </Label>
    </div>
  );
};
