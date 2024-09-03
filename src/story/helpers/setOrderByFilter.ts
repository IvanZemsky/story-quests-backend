import { QueryOptions } from 'mongoose';
import { OrderByFilter } from "../types/types";

export const setOrderByFilter = (order: OrderByFilter): QueryOptions => {
  switch (order) {
    case '':
      return undefined;
    case 'new':
      return { date: -1 };
    case 'popular':
      return { passes: 1 };
    case 'best':
      return { likes: 1 };
    default:
      return undefined
  }
};
