import { database } from "@/lib/database";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const activityLogs = await database.activity.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(activityLogs);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
