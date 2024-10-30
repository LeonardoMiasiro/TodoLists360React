import { ITask } from "../@types/task";

interface Props {
    setActiveModal(task: ITask): void
}

export function Task({ setActiveModal, ...task}: ITask & Props) {
    return (
        <div onClick={() => setActiveModal(task)}
            className="rounded-lg cursor-pointer hover:bg-gray-700 flex w-full items-center justify-start bg-slate-800 py-3"
        >
            <p className="ml-2">{task.name}</p>
        </div>
    )
}