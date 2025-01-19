import { Story } from "../story.schema"

export type SortByScenesAmount = "" | "short" | "medium" | "long"
export type OrderByFilter = "" | "best" | "popular" | "new"

export type LikedStoryDto = Story & {isLiked: boolean}
