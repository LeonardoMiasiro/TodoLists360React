import { useState } from 'react'
import './App.css'
import { List } from './components/List'
import { CreateList } from './components/CreateList'
import { IList } from './@types/list'

function App() {
  const [lists, setLists] = useState<IList[]>([])

  function addList(id: string, name: string) {
    const aux = [...lists]

    aux.push({
      id,
      name,
      position: aux.length,
      tasks: []
    })

    setLists(aux)
  }

  function deleteList(position: number) {
    const aux = [...lists]

    if(position >= 0) {
      aux.splice(position, 1)
    }

    setLists(aux)
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <p className='text-7xl'>Todo List</p>

      <div className='flex flex-row justify-around self-start items-start gap-5 mt-6'>
        {lists.map(list => <List key={list.id} deleteList={deleteList} {...list} />)}
        <CreateList addList={addList} />
      </div>
    </div>
  )
}

export default App