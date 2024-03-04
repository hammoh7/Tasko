import { auth } from "@clerk/nextjs";

interface BoardIdProps {
    params: {
        boardId: string,
    }
}

const BoardId = ({params}: BoardIdProps) => {
    const { orgId } = auth();
    
    return (
        <div>
            BoardId
        </div>
    )
}

export default BoardId;