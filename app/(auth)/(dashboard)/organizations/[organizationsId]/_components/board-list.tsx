import { FormPopover } from "@/components/form/popover";
import { Label } from "@/components/label";
import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async () => {

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-zinc-800">
        <User className="h-6 w-6 mr-2" />
        Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-md">Create</p>
            <span className="text-xs">5 remaining</span>
            <Label
              sideOffset={40}
              description={`Free workspaces can have upto 5 open boards. For unlimited boards upgrade this workspace`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Label>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
// 05:10:52