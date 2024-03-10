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
  CopyCard,
  CreateCard,
  DeleteCard,
  UpdateCard,
  UpdateCardOrder,
} from "./schema";
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

const updateHandler = async (
  data: UpdateInputType
): Promise<UpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { id, boardId, ...values } = data;

  let card;
  try {
    card = await database.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
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

export const updateCard = createSafeAction(UpdateCard, updateHandler);

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

const copyHandler = async (data: CopyInputType): Promise<CopyReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { id, boardId } = data;

  let card;
  try {
    const cardCopy = await database.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!cardCopy) {
      return { error: "Card not found!" };
    }

    const lastCard = await database.card.findFirst({
      where: { listId: cardCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await database.card.create({
      data: {
        title: `${cardCopy.title} - Copy`,
        description: cardCopy.description,
        order: newOrder,
        listId: cardCopy.listId,
      },
    });
  } catch (error) {
    return {
      error: `Failed to copy: ${(error as Error).message}`,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, copyHandler);

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

  let card;
  try {
    card = await database.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: `Failed to delete: ${(error as Error).message}`,
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, deleteHandler);
