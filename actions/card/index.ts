"use server";

import { auth } from "@clerk/nextjs";
import { CreateInputType, CreateReturnType } from "./types";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./schema";
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

  const { title, boardId, listId } = data;

  let card;
  try {
    const list = await database.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    if (!list) {
      return {
        error: "List not found",
      };
    }
    const lastCard = await database.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newCard = lastCard ? lastCard.order + 1 : 1;

    card = await database.card.create({
      data: {
        title,
        listId,
        order: newCard,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, createHandler);
