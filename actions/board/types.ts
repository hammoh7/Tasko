import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CreateBoard, DeleteBoard, UpdateBoard } from "./schema";

export type CreateInputType = z.infer<typeof CreateBoard>;
export type UpdateInputType = z.infer<typeof UpdateBoard>;
export type DeleteInputType = z.infer<typeof DeleteBoard>;
export type CreateReturnType = ActionState<CreateInputType, Board>
export type UpdateReturnType = ActionState<UpdateInputType, Board>
export type DeleteReturnType = ActionState<DeleteInputType, Board>
