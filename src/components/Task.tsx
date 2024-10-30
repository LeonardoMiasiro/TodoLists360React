import { ITask } from "../@types/task";

export function Task({ name }: ITask) {
    return (
        <div onClick={() => console.log('oi')}
            className="rounded-lg cursor-pointer hover:bg-gray-700 flex w-full items-center justify-start bg-slate-800 py-3"
        >
            <p className="ml-2">{name}</p>
        </div>
    )
}