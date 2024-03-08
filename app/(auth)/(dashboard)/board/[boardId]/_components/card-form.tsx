"use client";

import { createCard } from "@/actions/card";
import { TextArea } from "@/components/form/area";
import { FormSubmit } from "@/components/form/submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/actions";
import { PlusCircle, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card created`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      }
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const textAreaDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    }

    if (isEditing) {
      return (
        <form ref={formRef} action={onSubmit} className="m-1 px-1 py-1 space-y-3">
          <TextArea
            id="title"
            onKeyDown={textAreaDown}
            ref={ref}
            placeholder="Title..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              variant="ghost"
              size="sm"
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
