import { useState } from "react";
import { Task } from "./Task";
import { ITask } from "../@types/task";
import { IList } from "../@types/list";
import { CreateTask } from "./CreateTask";
import { Trash2 } from 'lucide-react';

interface Props {
    deleteList(position: number): void
}

export function List({ id, name, tasks: tasksList, deleteList, position }: IList & Props) {
    const [tasks, setTasks] = useState<ITask[]>(tasksList)

    function addTask(id: string, listId: string, listPosition: number, name: string) {
        const aux = [...tasks]

        aux.push({
            id,
            listId,
            listPosition,
            name
        })

        setTasks(aux)
    }

    return (
        <div className="border border-black rounded-lg bg-black pt-2 w-48 flex flex-col">
            <Trash2 className="self-end hover:opacity-70 cursor-pointer" onClick={() => deleteList(position)}/>
            <p className="text-3xl ">{name}</p>

            <div className="mt-5 gap-3 flex flex-col items-center px-2 pb-2">
                {tasks.sort((a, b) => a.listPosition - b.listPosition).map((task) => <Task key={task.id} {...task} />)}
            </div>

            <CreateTask addTask={addTask} listId={id} listPosition={tasks.length} />
        </div>
    );
}