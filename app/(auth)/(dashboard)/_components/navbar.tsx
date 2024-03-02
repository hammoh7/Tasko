import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ClipboardCheck, PlusCircle } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/popover";

const DashNav = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 h-14 w-full border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <ClipboardCheck className="h-8 w-8" />
          <p className="flex items-center justify-center ml-2 font-bold text-2xl text-blue-600">
            Tasko
          </p>
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <FormPopover>
            <Button
              size="sm"
              className="rounded-sm hidden md:block h-auto py-1.5 px-2 ml-5"
            >
              Create
            </Button>
          </FormPopover>
        </FormPopover>
        <Button size="sm" className="rounded-sm block md:hidden">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organizations/:id"
          afterLeaveOrganizationUrl="/organizations"
          afterSelectOrganizationUrl="/organizations/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default DashNav;
