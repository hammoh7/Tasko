interface OutlinerProps {
    children: React.ReactNode;
}

export const Outliner = ({
    children
}:OutlinerProps) => {
    return (
        <li className="shrink-0 h-full w-[270px] select-none">
            {children}
        </li>
    )
}