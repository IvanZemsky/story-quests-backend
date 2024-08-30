import { QueryOptions } from 'mongoose';
import { SortByFilter } from "../types/types";

export const setSortByFilter = (length: SortByFilter): QueryOptions => {
  switch (length) {
    case '':
      return undefined;
    case 'new':
      return { $lt: 5 };
    case 'popular':
      return { $gte: 5, $lt: 10 };
    case 'best':
      return { $gte: 10 };
  }
};
