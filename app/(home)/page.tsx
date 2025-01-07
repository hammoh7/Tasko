import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center border shadow-md p-5 bg-blue-100 text-sky-700 rounded-2xl">
          <ClipboardCheck className="h-8 w-8" />
          Tasko | Task Manager for you
        </div>
        <h1 className="text-3xl md:text-4xl items-center text-center text-zinc-700 m-5 font-extrabold font-sans">
          Tasko: Simplify your Workflow
        </h1>
        <div className="text-md md:text-lg items-center text-center text-zinc-500">
          <p className="pt-1 pl-2 pr-2 text-blue-950 rounded-t-md">
            Task Management giving you clarity of tasks
          </p>
          <p className="pb-1 pl-2 pr-2 text-blue-950 rounded-b-md">
            Start Streamlining your work with Tasko!
          </p>
        </div>
      </div>
      <div className="text-sm md:text-md text-zinc-800 mt-5 max-w-sm md:max-w-xl text-center mx-auto">
        A collaborative project management platform that brings clarity to your
        team&apos;s tasks. Create boards, organize lists, and effortlessly manage
        projects with intuitive cards. Boost productivity, foster collaboration,
        and stay on top of deadlines.
      </div>
      <Button size="lg" className="mt-5 text-md" asChild>
        <Link href="/login">
            Start for Free
        </Link>
      </Button>
    </div>
  );
};

export default Home;
