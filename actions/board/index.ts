"use server";

import { auth } from "@clerk/nextjs";
import { database } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/actions";
import { CreateBoard, DeleteBoard, UpdateBoard } from "./schema";
import {
  CreateInputType,
  CreateReturnType,
  DeleteInputType,
  DeleteReturnType,
  UpdateInputType,
  UpdateReturnType,
} from "./types";
import { redirect } from "next/navigation";

const createHandler = async (
  data: CreateInputType
): Promise<CreateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing fields! Failed to create Board",
    };
  }

  let board;
  try {
    board = await database.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create!",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, createHandler);

const updateHandler = async (
  data: UpdateInputType
): Promise<UpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { title, id } = data;

  let board;
  try {
    board = await database.board.update({
      where: {
        id,
        orgId,
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
  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, updateHandler);




const deleteHandler = async (
  data: DeleteInputType
): Promise<DeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }
  const { id } = data;

  let board;
  try {
    board = await database.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete!",
    };
  }
  revalidatePath(`/organizations/${orgId}`);
  redirect(`/organizations/${orgId}`)
};

export const deleteBoard = createSafeAction(DeleteBoard, deleteHandler);
