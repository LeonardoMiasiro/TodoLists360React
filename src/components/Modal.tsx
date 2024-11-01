import { useState } from "react";
import { ITask } from "../@types/task";
import { X, Pencil, Trash2 } from 'lucide-react';
import { IList } from "../@types/list";
import api from "../lib/axios";


interface Props {
    deleteTask(listIndex: number, taskIndex: number, taskId: string): void
    lists: IList[]
    setLists(lists: IList[]): void
    close(): void
    listIndex: number
    taskListIndex: number
}

export function Modal({ name, id, deleteTask, close, description, listId, lists, setLists, listPosition, listIndex, taskListIndex }: ITask & Props) {
    const [openInputDesc, setOpenInputDesc] = useState(false)
    const [openInputTitle, setOpenInputTitle] = useState(false)
    const [desc, setDesc] = useState<string>(description ?? '')
    const [title, setTitle] = useState<string>(name)

    async function updateTask() {
        try {
            if (listIndex < 0 || taskListIndex < 0) return

            if(openInputTitle)
                name = title.trim()
            else 
                description = desc.trim()
            
            await api.put(`/task/${id}`, {
                name,
                description,
                listId,
                listPosition,
            })
            const aux = [...lists]

            const task: ITask = {
                id,
                listId,
                listPosition,
                name,
                description,
            }

            aux[listIndex].tasks[taskListIndex] = task

            setLists(aux)
            clearInputsOpen()
        } catch {
            alert('Não foi possível atualizar a tarefa')
        }
    }

    function clearInputsOpen(){
        setOpenInputDesc(false)
        setOpenInputTitle(false)
    }

    return (
        <div className="w-1/2 bg-zinc-700 absolute z-10 self-center left-1/4 mt-6 border rounded-md border-black">
            <div className="flex flex-row items-center justify-between mx-3">
                <X
                    className="hover:opacity-70 cursor-pointer"
                    onClick={() => {
                        clearInputsOpen()
                        close()
                    }}
                />
                {openInputTitle ?
                    <input
                        className="bg-transparent rounded-sm w-8/12 my-3 text-lg mt-10 border px-2"
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => {
                            updateTask()
                            setOpenInputTitle(false)
                        }} onKeyDown={(e) => {
                            if (e.key === 'Enter') updateTask()
                            else if (e.key === "Escape") setOpenInputTitle(false)
                        }}
                    /> :
                    <p className="text-lg mt-10 w-8/12" onClick={() => setOpenInputTitle(true)} onBlur={() => setOpenInputTitle(false)}>{title === '' ? 'Adicione um nome a essa tarefa' : title}</p>
                }
                <Trash2 onClick={() => {
                    deleteTask(listIndex, taskListIndex, id)
                    close()
                }} className="hover:opacity-70 cursor-pointer" />
            </div>
            <div className="mt-2 p-4 flex flex-col items-center">
                <Pencil className="self-end hover:opacity-70 cursor-pointer" onClick={() => setOpenInputDesc(!openInputDesc)} />
                {openInputDesc ? <textarea
                    className="bg-gray-300 w-10/12 rounded-sm my-3 text-black h-32 px-2"
                    value={desc} onChange={(e) => setDesc(e.target.value)} onBlur={() => {
                        updateTask()
                        setOpenInputDesc(false)
                    }} onKeyDown={(e) => {
                        if (e.key === 'Enter') updateTask()
                        else if (e.key === "Escape") setOpenInputDesc(false)
                    }}
                /> :
                    desc ?
                        <p className="break-words break-all px-6 mt-2">{desc}</p> :
                        <p onClick={() => setOpenInputDesc(true)} className="break-words px-6 mt-2 hover:opacity-70 cursor-pointer">Adicione uma descrição a essa tarefa</p>
                }
            </div>
        </div>
    )
}