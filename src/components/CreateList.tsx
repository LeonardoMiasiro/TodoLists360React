import { useState } from "react";
import api from "../lib/axios";

interface Props {
    addList(id: string, name: string): void
    proxPosition: number
}

export function CreateList({ addList, proxPosition }: Props) {
    const [active, setActive] = useState(false)
    const [name, setName] = useState('')

    async function createListApi() {
        const response = await api.post<unknown, {
            id: string
        }>('/list', {
            name,
            position: proxPosition
        })

        addList(response.id, name)
        clean()
    }

    function clean() {
        setName('')
        setActive(false)
    }

    return (
        <div className="border border-black rounded-lg bg-black pt-2 w-48">
            { active && <input 
                className="bg-gray-300 w-10/12 rounded-sm my-3 text-black"
                type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { 
                    if(e.key === 'Enter') createListApi()
                    else if(e.key === "Escape") clean()
                 }}
            /> }

            <p className="text-sm hover:opacity-75 cursor-pointer" onClick={() => {
                if(active) createListApi()
                    else setActive(true)
            }}>+ Adicionar nova lista</p>
        </div>
    );
}