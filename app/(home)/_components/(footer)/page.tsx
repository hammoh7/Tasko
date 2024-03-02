import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white fixed bottom-0 w-full p-4 border-t">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between space-x-8">
        <Link
          className="font-bold text-2xl text-blue-600 flex items-center justify-center"
          href="/"
        >
          <ClipboardCheck className="mr-2 h-7 w-7" />
          Tasko
        </Link>
        <div className="space-x-3 md:block md:w-auto flex items-center justify-between mr-10">
          <Button size="lg" variant="link">
            Privacy Policy
          </Button>
          <Button size="lg" variant="link">
            Terms & Conditions
          </Button>
        </div>
      </div>
    </footer>
  );
};
