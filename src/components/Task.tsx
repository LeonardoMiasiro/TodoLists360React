import { ITask } from "../@types/task";
import { PropsIndexTask } from "../App";

interface Props {
    setActiveModal(task: ITask & PropsIndexTask): void
    listIndex: number
    taskListIndex: number
}

export function Task({ setActiveModal, taskListIndex, listIndex, ...task}: ITask & Props) {
    return (
        <div onClick={() => setActiveModal({
            taskListIndex,
            listIndex,
            ...task
        })}
            className="rounded-lg cursor-pointer hover:bg-gray-700 flex w-full items-center justify-start bg-slate-800 py-3 break-words break-all text-left"
        >
            <p className="ml-2">{task.name === '' ? 'sem nome' : task.name}</p>
        </div>
    )
}