import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CreateCard, UpdateCardOrder } from "./schema";

export type CreateInputType = z.infer<typeof CreateCard>;
export type UpdateOrderInputType = z.infer<typeof UpdateCardOrder>;

export type CreateReturnType = ActionState<CreateInputType, Card>;
export type UpdateOrderReturnType = ActionState<UpdateOrderInputType, Card[]>;

