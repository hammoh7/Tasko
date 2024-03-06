"use client";

import { ListOfCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListBlockProps {
    data: ListOfCards[];
    boardId: string;
};

export const ListBlock = ({
    data, boardId
}:ListBlockProps) => {
    const [orderedData, setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]); 

    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => {
                return (
                    <ListItem 
                      key={list.id}
                      index={index}
                      data={list}
                    />
                )
            })}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
        </ol>
    )
}