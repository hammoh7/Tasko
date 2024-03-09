"use server";

import { auth } from "@clerk/nextjs";
import {
  CreateInputType,
  CreateReturnType,
  UpdateOrderInputType,
  UpdateOrderReturnType,
} from "./types";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { CreateCard, UpdateCardOrder } from "./schema";
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

const updateCardHandler = async (
  data: UpdateOrderInputType
): Promise<UpdateOrderReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { items, boardId } = data;

  let cards;
  try {
    const transaction = items.map((card) =>
      database.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );
    cards = await database.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder!",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: cards };
};

export const updateCardOrder = createSafeAction(
  UpdateCardOrder,
  updateCardHandler
);
