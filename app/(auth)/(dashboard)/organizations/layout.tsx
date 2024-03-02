import Sidebar from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-5 max-w-8xl max-w-screen-2xl mx-auto">
      <div className="flex gap-x-4">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
