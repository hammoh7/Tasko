import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CopyCard, CreateCard, DeleteCard, UpdateCard, UpdateCardOrder } from "./schema";

export type CreateInputType = z.infer<typeof CreateCard>;
export type UpdateInputType = z.infer<typeof UpdateCard>;
export type UpdateOrderInputType = z.infer<typeof UpdateCardOrder>;
export type CopyInputType = z.infer<typeof CopyCard>;
export type DeleteInputType = z.infer<typeof DeleteCard>;

export type CreateReturnType = ActionState<CreateInputType, Card>;
export type UpdateReturnType = ActionState<UpdateInputType, Card>;
export type UpdateOrderReturnType = ActionState<UpdateOrderInputType, Card[]>;
export type CopyReturnType = ActionState<CopyInputType, Card>;
export type DeleteReturnType = ActionState<DeleteInputType, Card>;
