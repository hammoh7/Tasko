"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardsOfList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { ActivityData } from "./activity";
import { Activity } from "@prisma/client";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardsOfList>({
    queryKey: ["card", id],
    queryFn: () => {
      if (!id) {
        return Promise.reject("Card ID is missing");
      }
      return fetcher(`/api/cards/${id}`);
    },
  });

  const { data: activityData } = useQuery<Activity[]>({
    queryKey: ["card-logs", id],
    queryFn: () => {
      if (!id) {
        return Promise.reject("Card ID is missing");
      }
      return fetcher(`/api/cards/${id}/logs`);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-5">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!activityData ? (
                <ActivityData.Skeleton />
              ) : (
                <ActivityData items={activityData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
