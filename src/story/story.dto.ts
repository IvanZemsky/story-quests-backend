import { IAnswer } from "src/scene/types/types"

export type SceneType = "default" | "end"

export interface IScene {
   id: string
   title: string
   description: string
   img: string | undefined
   type: SceneType
   answers: IAnswer[]
}

export class CreateStoryDto {
   readonly name: string
   readonly description: string
   readonly img: string
   readonly scenes: IScene[]
}
