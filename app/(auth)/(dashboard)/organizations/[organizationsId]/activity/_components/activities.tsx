import { ActivityItem } from "@/components/activity-items";
import { Skeleton } from "@/components/ui/skeleton";
import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const Activities = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const activityLogs = await database.activity.findMany({
    where: {
      orgId,
    },
  });

  return (
    <ol className="space-y-3 mt-3">
      <p className="hidden last:block text-sm text-center text-muted-foreground">
        No activity
      </p>
      {activityLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

Activities.Skeleton = function ActivitiesSkeleton() {
    return (
        <ol className="space-y-3 mt-3">
            <Skeleton className="w-[70%] h-12" />
            <Skeleton className="w-[70%] h-12" />
            <Skeleton className="w-[70%] h-12" />
            <Skeleton className="w-[70%] h-12" />
            <Skeleton className="w-[70%] h-12" />
        </ol>
    )  
}