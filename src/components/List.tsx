import { Task } from "./Task";
import { ITask } from "../@types/task";
import { IList } from "../@types/list";
import { CreateTask } from "./CreateTask";
import { Trash2 } from 'lucide-react';
import { Draggable } from "react-beautiful-dnd";
import { PropsIndexTask } from "../App";
import { useState } from "react";
import api from "../lib/axios";

interface Props {
    deleteList(listId: string, listIndex: number): void
    setTaskSelected(task: ITask & PropsIndexTask | null): void
    lists: IList[]
    setLists(lists: IList[]): void
    listIndex: number
}

export function List({ id, name, tasks, lists, listIndex, setLists, deleteList, setTaskSelected, position }: IList & Props) {
    const [openInputTitle, setOpenInputTitle] = useState(false)
    const [title, setTitle] = useState(name)

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

    async function updateList() {
        try {
            await api.put(`/list/${id}`, {
                name: title,
                position,
            })

            const aux = [...lists]

            aux[listIndex].name = title

            setLists(aux)
        } catch {
            alert('Não foi possível mudar o nome da lista')
        }
    }

    return (
        <div className="border border-black rounded-lg bg-black pt-2 w-52 flex flex-col min-h-28">
            <Trash2 className="self-end hover:opacity-70 cursor-pointer" onClick={() => deleteList(id, listIndex)} />
            
            {openInputTitle ?
                    <input
                        className="bg-transparent rounded-sm w-full my-3 text-3xl border px-2"
                        type="text" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} onBlur={() => {
                            updateList()
                            setOpenInputTitle(false)
                        }} onKeyDown={(e) => {
                            if (e.key === 'Enter'){
                                updateList()
                                setOpenInputTitle(false)
                            } 
                        }}
                    /> :
                    <p className="text-3xl w-full break-words break-all px-2" onClick={() => setOpenInputTitle(true)} onBlur={() => setOpenInputTitle(false)}>{title === '' ? 'Sem título' : title}</p>
                }

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