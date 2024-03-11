import { Activity } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { activityMessage } from "@/lib/activity-message";
import { format } from "date-fns";

interface ActivityItemProps {
    data: Activity;
}

export const ActivityItem = ({
    data,
}: ActivityItemProps) => {
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-7 w-7">
                <AvatarImage src={data.userImage} />
            </Avatar>
            <div className="flex flex-col space-y-1">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-slate-800">
                        {data.userName}
                    </span> {
                        activityMessage(data)
                    }
                </p>
                <p className="text-sm text-muted-foreground">
                    {format(new Date(data.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </p>
            </div>
        </li>
    )
}