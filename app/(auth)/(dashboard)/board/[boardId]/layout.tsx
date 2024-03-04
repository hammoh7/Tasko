import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNav } from "./_components/navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await database.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: `Tasko | ${board?.title || "Board"}`,
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await database.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${board.imageFullUrl})`,
      }}
    >
      <BoardNav data={board} />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
