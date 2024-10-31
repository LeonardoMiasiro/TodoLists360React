import { Task } from "./Task";
import { ITask } from "../@types/task";
import { IList } from "../@types/list";
import { CreateTask } from "./CreateTask";
import { Trash2 } from 'lucide-react';
import { Draggable } from "react-beautiful-dnd";
import { PropsIndexTask } from "../App";

interface Props {
    deleteList(id: string): void
    setTaskSelected(task: ITask & PropsIndexTask | null): void
    lists: IList[]
    setLists(lists: IList[]): void
    listIndex: number
}

export function List({ id, name, tasks, lists, listIndex, setLists, deleteList, setTaskSelected }: IList & Props) {

    function addTask(id: string, listId: string, listPosition: number, name: string) {
        const aux = [...lists]

        const listIndex = aux.findIndex(list => list.id === listId)

        if (listIndex < 0) return

        const task: ITask = {
            id,
            listId,
            listPosition,
            name
        }

        aux[listIndex].tasks.push(task)

        setLists(aux)
    }

    return (
        <div className="border border-black rounded-lg bg-black pt-2 w-48 flex flex-col min-h-28">
            <Trash2 className="self-end hover:opacity-70 cursor-pointer" onClick={() => deleteList(id)} />
            <p className="text-3xl ">{name}</p>

            <div className="mt-5 gap-1 flex flex-col items-center px-1 pb-2">
                {tasks.sort((a, b) => a.listPosition - b.listPosition).map((task, index) =>
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="w-full"
                            >
                                <Task setActiveModal={setTaskSelected} listIndex={listIndex} taskListIndex={index} {...task} />
                            </div>
                        )}
                    </Draggable>)}
            </div>

            <CreateTask addTask={addTask} listId={id} listPosition={tasks.length} />
        </div>
    );
}