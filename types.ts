import { Card, List } from "@prisma/client";

export type ListOfCards = List & { cards: Card[] }

export type CardsOfList = Card & { list: List }

