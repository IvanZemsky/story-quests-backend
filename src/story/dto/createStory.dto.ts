import { IScene } from "../types/types"

export class CreateStoryDto {
   readonly name: string
   readonly description: string
   readonly img: string
   readonly scenes: IScene[]
}