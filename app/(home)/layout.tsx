import Footer from "./_components/(footer)/page";
import Navbar from "./_components/(navbar)/page";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-r from-blue-300 to-blue-500">
      <Navbar />
      <main className="pt-28 pb-25">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
