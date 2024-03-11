"use client";

import { ActivityItem } from "@/components/activity-items";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityDataProps {
  items: Activity[];
}

export const ActivityData = ({ items }: ActivityDataProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-4 w-4 mt-1 text-slate-700" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">
          Activity
        </p>
        <ol className="mt-2 space-y-3">
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

ActivityData.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-5 w-5 bg-slate-300" />
      <div className="w-full">
        <Skeleton className="w-24 h-5 mb-2 bg-slate-300" />
        <Skeleton className="w-full h-8 bg-slate-300" />
      </div>
    </div>
  );
};
