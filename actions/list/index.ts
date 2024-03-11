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
  UpdateOrderInputType,
  UpdateOrderReturnType,
  UpdateReturnType,
} from "./types";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import {
  CopyList,
  CreateList,
  DeleteList,
  UpdateList,
  UpdateListOrder,
} from "./schema";
import { createSafeAction } from "@/lib/actions";
import { createActivity } from "@/lib/activity";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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
    await createActivity({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create!",
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
    await createActivity({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
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
    await createActivity({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
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

  let createdList;
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
    await createActivity({
      entityTitle: listCopy.title,
      entityId: listCopy.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error: any) {
    return {
      error: `Failed to copy: ${(error as Error).message}`,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: createdList };
};

export const copyList = createSafeAction(CopyList, copyHandler);

const updateListHandler = async (
  data: UpdateOrderInputType
): Promise<UpdateOrderReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { items, boardId } = data;

  let lists;
  try {
    const transaction = items.map((list) =>
      database.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
    lists = await database.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(
  UpdateListOrder,
  updateListHandler
);
