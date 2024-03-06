import { z } from "zod";
import { ActionState } from "@/lib/actions";
import { CopyList, CreateList, DeleteList, UpdateList } from "./schema";
import { List } from "@prisma/client";

export type CreateInputType = z.infer<typeof CreateList>;
export type UpdateInputType = z.infer<typeof UpdateList>;
export type DeleteInputType = z.infer<typeof DeleteList>;
export type CopyInputType = z.infer<typeof CopyList>;
export type CreateReturnType = ActionState<CreateInputType, List>
export type UpdateReturnType = ActionState<UpdateInputType, List>
export type DeleteReturnType = ActionState<DeleteInputType, List>
export type CopyReturnType = ActionState<CopyInputType, List>