import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white flex justify-between p-5 border-b">
      <div className="flex gap-7 items-center justify-center">
        <Link className="font-bold text-2xl text-blue-600" href="/">
          Tasko
        </Link>
        <nav className="flex items-center gap-5 ml-5 text-gray-700 text-md">
          <Button variant="ghost" className="items-center rounded-lg text-md">
            <Link href="/about">About Us</Link>
          </Button>
          <Button variant="ghost" className="items-center rounded-lg text-md">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>
      </div>
      <div className="flex items-center mr-10">
        <Button variant="ghost" className="items-center rounded-lg text-md">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
      
    </header>
  );
};

export default Navbar;
