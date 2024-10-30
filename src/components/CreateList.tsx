import { useState } from "react";

interface Props {
    addList(id: string, name: string): void
}

export function CreateList({ addList }: Props) {
    const [active, setActive] = useState(false)
    const [name, setName] = useState('')

    function createListApi() {
        addList('2', name)
        clean()
    }

    function clean() {
        setName('')
        setActive(false)
    }

    return (
        <div className="border border-black rounded-lg bg-black pt-2 w-48">
            { active && <input 
                className="bg-gray-300 w-10/12 rounded-sm my-3"
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