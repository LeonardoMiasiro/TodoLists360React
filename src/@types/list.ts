import { ITask } from "./task"

export interface IList {
    id: string
    name: string
    position: number
    tasks: ITask[]
}