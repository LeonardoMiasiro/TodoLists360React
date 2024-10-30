import { useState } from 'react'
import './App.css'
import { List } from './components/List'
import { CreateList } from './components/CreateList'
import { IList } from './@types/list'
import { ITask } from './@types/task'
import { Modal } from './components/Modal'

function App() {
  const [lists, setLists] = useState<IList[]>([])
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null)

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

  function deleteList(listId: string) {
    const aux = [...lists]

    setLists(aux.filter(list => list.id !== listId))
  }

  function deleteTask(listId: string, taskId: string) {
    const aux = [...lists]

    const listIndex = aux.findIndex(list => list.id === listId)

    if (listIndex < 0) return

    const updatedList: IList = {
      ...aux[listIndex],
      tasks: aux[listIndex].tasks.filter(task => task.id !== taskId)
    }
    aux[listIndex] = updatedList

    setLists(aux)
  }

  return (
    <div>
      {taskSelected && <Modal deleteTask={deleteTask} close={() => setTaskSelected(null)} {...taskSelected} />
      }

      <div className={`flex items-center justify-center flex-col ${taskSelected ? 'opacity-20' : ''}`}>
        <p className='text-7xl'>Todo List</p>

        <div className='flex flex-row justify-around self-start items-start gap-5 mt-6'>

          {lists.map(list => <List key={list.id} lists={lists} setLists={setLists} deleteList={deleteList} setTaskSelected={setTaskSelected} {...list} />)}
          <CreateList addList={addList} />
        </div>
      </div>
    </div>
  )
}

export default App