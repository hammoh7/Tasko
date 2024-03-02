"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NotebookText, Layers, Cog, CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavOrgItemsProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavOrgItems = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavOrgItemsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layers className="h-4 w-4 mr-2" />,
      href: `/organizations/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <NotebookText className="h-4 w-4 mr-2" />,
      href: `/organizations/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Cog className="h-4 w-4 mr-2" />,
      href: `/organizations/${organization.id}/settings`,
    },
    {
      label: "Plan",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organizations/${organization.id}/plan`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-blue-200/50 text-blue-900"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-lg object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-zinc-800">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-8 mb-1",
              pathname === route.href && "bg-blue-300/50 text-blue-800"
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavOrgItems.Skeleton = function SkeletonNavOrgItems() {
    return (
        <div className="flex item-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}