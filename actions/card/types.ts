import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CreateCard, UpdateCard, UpdateCardOrder } from "./schema";

export type CreateInputType = z.infer<typeof CreateCard>;
export type UpdateInputType = z.infer<typeof UpdateCard>;
export type UpdateOrderInputType = z.infer<typeof UpdateCardOrder>;

export type CreateReturnType = ActionState<CreateInputType, Card>;
export type UpdateReturnType = ActionState<UpdateInputType, Card>;
export type UpdateOrderReturnType = ActionState<UpdateOrderInputType, Card[]>;
