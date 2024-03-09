"use client";

import { ListOfCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/actions";
import { updateListOrder } from "@/actions/list";
import { updateCardOrder } from "@/actions/card";
import { toast } from "sonner";

interface ListBlockProps {
  data: ListOfCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListBlock = ({ data, boardId }: ListBlockProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeListOrder } = useAction(updateListOrder, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "lists") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      executeListOrder({ items, boardId });
    } else if (type === "cards") {
      const updatedLists = orderedData.map((list) => {
        if (list.id === source.droppableId) {
          const cards = reorder(
            list.cards,
            source.index,
            destination.index
          ).map((card, index) => ({ ...card, order: index }));
          return { ...list, cards };
        }
        return list;
      });

      setOrderedData(updatedLists);
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const targetList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !targetList) {
        return;
      }
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!targetList.cards) {
        targetList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderingCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderingCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderingCards;

        setOrderedData(newOrderedData);
        executeCardOrder({ 
          boardId: boardId, 
          items: reorderingCards,
        })
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        targetList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        targetList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeCardOrder({ 
          boardId: boardId, 
          items: targetList.cards,
        })
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="lists" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
