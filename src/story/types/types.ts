import { IAnswer } from "src/scenes/types/types"

export type SceneType = "default" | "end"

export interface IScene {
   id: string
   title: string
   description: string
   img: string | undefined
   type: SceneType
   answers: IAnswer[]
}