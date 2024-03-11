import { ACTION, Activity } from "@prisma/client";

export const activityMessage = (log: Activity) => {
    const { action, entityTitle, entityType } = log;

    switch (action) {
        case ACTION.CREATE: 
          return `created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.UPDATE: 
          return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.DELETE: 
          return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        default: 
          return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
    }
}