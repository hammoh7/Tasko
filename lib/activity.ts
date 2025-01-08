import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { database } from "./database";

interface ActivityProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createActivity = async (props: ActivityProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    const { entityId, entityTitle, entityType, action } = props;

    await database.activity.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[Activity_error]", error);
  }
};
