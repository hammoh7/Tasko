import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modals";
import { QueryProvider } from "@/components/providers/query";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default AuthLayout;
