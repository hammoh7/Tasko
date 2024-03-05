import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListBlock } from "./_components/list-block";

interface BoardIdProps {
    params: {
        boardId: string,
    }
}

const BoardId = async({params}: BoardIdProps) => {
    const { orgId } = auth();
    
    if (!orgId) {
        redirect("/select-org");
    }

    const lists = await database.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })

    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListBlock 
              boardId={params.boardId}
              data={lists}
            />
        </div>
    )
}

export default BoardId;