"use client";

import { ListOfCards } from "@/types";
import { ListForm } from "./list-form";

interface ListBlockProps {
    data: ListOfCards[];
    boardId: string;
};

export const ListBlock = ({
    data, boardId
}:ListBlockProps) => {
    return (
        <ol>
            <ListForm />
            <div className="flex-shrink-0 w-1" />
        </ol>
    )
}