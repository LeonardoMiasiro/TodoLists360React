import { ITask } from "../@types/task";
import { X } from 'lucide-react';

interface Props {
    deleteTask(listId: string, taskId: string): void
    close(): void
}

export function Modal({ name, id, deleteTask, close, description, listId }: ITask & Props) {
    return (
        <div className="w-1/2 bg-zinc-700 absolute z-10 self-center left-1/4 mt-6" onBlur={close}>
            <X onClick={() => {
                close()
                deleteTask(listId, id)
            }} />
            <p>{name}</p>
            <p>{description}</p>
        </div>
    )
}