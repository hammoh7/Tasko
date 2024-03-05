"use server";

import { auth } from "@clerk/nextjs";
import { CreateInputType, CreateReturnType } from "./types";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { CreateList } from "./schema";
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
