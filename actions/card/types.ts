import { z } from "zod";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CreateCard } from "./schema";

export type CreateInputType = z.infer<typeof CreateCard>;
export type CreateReturnType = ActionState<CreateInputType, Card>;
