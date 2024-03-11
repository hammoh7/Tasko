import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { Suspense } from "react";
import { Activities } from "./_components/activities";

const Activity = () => {
    return (
        <div className="w-full">
            <Info />
            <Separator className="my-2" />
            <Suspense fallback={<Activities.Skeleton />}>
                <Activities />
            </Suspense>
        </div>
    )
}

export default Activity;