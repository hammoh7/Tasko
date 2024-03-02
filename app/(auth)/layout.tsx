import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider>
            <Toaster />
            {children}
        </ClerkProvider>
    )
}

export default AuthLayout;