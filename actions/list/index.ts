"use server";

import { auth } from "@clerk/nextjs";
import {
  CopyInputType,
  CopyReturnType,
  CreateInputType,
  CreateReturnType,
  DeleteInputType,
  DeleteReturnType,
  UpdateInputType,
  UpdateReturnType,
} from "./types";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { CopyList, CreateList, DeleteList, UpdateList } from "./schema";
import { createSafeAction } from "@/lib/actions";

const createHandler = async (
  data: CreateInputType
): Promise<CreateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { title, boardId } = data;

  let list;
  try {
    const board = await database.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: "Board not found!",
      };
    }
    const lastList = await database.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await database.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, createHandler);

const updateHandler = async (
  data: UpdateInputType
): Promise<UpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { title, id, boardId } = data;

  let list;
  try {
    list = await database.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, updateHandler);

const deleteHandler = async (
  data: DeleteInputType
): Promise<DeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { id, boardId } = data;

  let list;
  try {
    list = await database.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, deleteHandler);



const copyHandler = async (data: CopyInputType): Promise<CopyReturnType> => {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { id, boardId } = data;

  try {
    const listCopy = await database.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listCopy) {
      return { error: "List not found" };
    }
    const lastList = await database.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    let createdList;
    if (listCopy.cards && listCopy.cards.length > 0) {
      createdList = await database.list.create({
        data: {
          boardId: listCopy.boardId,
          title: `${listCopy.title} - Copy`,
          order: newOrder,
          cards: {
            createMany: {
              data: listCopy.cards.map((card) => ({
                title: card.title,
                description: card.description,
                order: card.order,
              })),
            },
          },
        },
        include: {
          cards: true,
        },
      });
    } else {
      createdList = await database.list.create({
        data: {
          boardId: listCopy.boardId,
          title: `${listCopy.title} - Copy`,
          order: newOrder,
        },
      });
    }
    revalidatePath(`/board/${boardId}`);
    return { data: createdList };
  } catch (error: any) {
    console.error("Copy handler error:", error);
    return {
      error: `Failed to copy: ${(error as Error).message}`,
    };
  }
};

export const copyList = createSafeAction(CopyList, copyHandler);



