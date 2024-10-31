import { useState } from "react"
import api from "../lib/axios"

interface Props {
    addTask(id: string, listId: string, listPosition: number, name: string): void
    listId: string
    listPosition: number
}

export function CreateTask({ addTask, listId, listPosition }: Props) {
    const [active, setActive] = useState(false)
    const [name, setName] = useState('')

    async function createTaskApi() {
        const response = await api.post<unknown, {
            id: string
        }>('/task', {
            name,
            listId,
            listPosition,
        })

        addTask(response.id, listId, listPosition, name)
        clean()
    }

    function clean() {
        setName('')
        setActive(false)
    }

    return (
        <div>
            { active && <input 
                className="bg-gray-300 w-10/12 rounded-sm my-3 text-black"
                type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { 
                    if(e.key === 'Enter') createTaskApi()
                    else if(e.key === "Escape") clean()
                 }}
            /> }

            <p className="mt-2 hover:opacity-65 text-sm cursor-pointer" onClick={() => {
                if (active) createTaskApi()
                else setActive(true)
            }} onBlur={clean}>+ Adicionar nova tarefa</p>
        </div>
    )
}