"use client";

import { updateCard } from "@/actions/card";
import { TextArea } from "@/components/form/area";
import { FormSubmit } from "@/components/form/submit";
import { Label } from "@/components/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/actions";
import { CardsOfList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignJustify } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardsOfList;
}

export const Description = ({ data }: DescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const queryClient = useQueryClient();
  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
    })
    
      toast.success("Card updated");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3">
      <AlignJustify className="h-5 w-5 mt-0.5 text-slate-700" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-1">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <TextArea
              id="description"
              className="w-full mt-2"
              placeholder="Add more description..."
              ref={textareaRef}
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                variant="ghost"
                type="button"
                onClick={disableEditing}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[80px] sm:min-w-full md:w-[120%] lg:w-[120%] xl:w-[120%] bg-slate-200 text-sm font-medium px-3 py-2 rounded-md"
          >
            <Label description="Edit" side="right">
              {data.description || "Add more description..."}
            </Label>
          </div> 
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-5 w-5 bg-slate-300" />
      <div className="w-full">
        <Skeleton className="w-20 h-5 mb-2 bg-slate-300" />
        <Skeleton className="w-full h-[70px] bg-slate-300" />
      </div>
    </div>
  );
};
