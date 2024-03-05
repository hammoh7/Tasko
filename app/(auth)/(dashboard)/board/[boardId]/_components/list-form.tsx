"use client";

import { PlusCircle, X } from "lucide-react";
import { Outliner } from "./outliner";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/actions";
import { createList } from "@/actions/list";
import { toast } from "sonner";

export const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List created!`)
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title, 
      boardId,
    })
  }

  if (isEditing) {
    return (
      <Outliner>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-2 h-6 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Title"
          />
          <input 
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
                Add
            </FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
                <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Outliner>
    );
  }

  return (
    <Outliner>
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/70 hover:bg-white/35 transition p-3 flex items-center font-medium text-md"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add a list
        </button>
      </form>
    </Outliner>
  );
};
