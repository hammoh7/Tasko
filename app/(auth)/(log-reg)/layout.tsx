const LogRegLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-t from-blue-300 to-blue-600">
            {children}
        </div>
    )
}

export default LogRegLayout;