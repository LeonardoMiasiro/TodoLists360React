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
        if(name == '') {
            clean()
            return
        }
        try {
            const response = await api.post<unknown, {
                data: {
                    id: string
                }
            }>('/task', {
                name,
                listId,
                listPosition,
            })
    
            addTask(response.data.id, listId, listPosition, name)
            clean()
        } catch {
            alert('Não foi possível criar uma tarefa')
        }
    }

    function clean() {
        setName('')
        setActive(false)
    }

    return (
        <div>
            { active && <input 
                className="bg-gray-300 w-10/12 rounded-sm my-3 text-black"
                type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => {
                    createTaskApi()
                }} onKeyDown={(e) => { 
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