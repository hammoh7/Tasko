import { z } from "zod";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/actions";
import { CreateList } from "./schema";

export type CreateInputType = z.infer<typeof CreateList>;
export type CreateReturnType = ActionState<CreateInputType, List>