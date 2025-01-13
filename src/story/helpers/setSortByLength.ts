import { QueryOptions } from "mongoose"
import { SortByScenesAmount } from "../types/types"

export const setSortByLength = (length: SortByScenesAmount): QueryOptions | undefined => {
   switch (length) {
      case "":
         return undefined
      case "short":
         return { $lt: 5 }
      case "medium":
         return { $gte: 5, $lt: 10 }
      case "long":
         return { $gte: 10 }
   }
}
