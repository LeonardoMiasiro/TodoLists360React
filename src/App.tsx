import { useEffect, useState } from 'react'
import './App.css'
import { List } from './components/List'
import { CreateList } from './components/CreateList'
import { IList } from './@types/list'
import { ITask } from './@types/task'
import { Modal } from './components/Modal'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import api from './lib/axios'

export interface PropsIndexTask {
  listIndex: number
  taskListIndex: number
}

function App() {
  const [lists, setLists] = useState<IList[]>([])
  const [taskSelected, setTaskSelected] = useState<ITask & PropsIndexTask | null>(null)

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

  async function deleteList(listId: string, listIndex: number) {
    try {
      await api.delete(`/list/${listId}`)

      const aux = [...lists]

      aux.splice(listIndex, 1)

      setLists(aux)
    } catch {
      alert('Não foi possível deletar a lista')
    }
  }

  async function deleteTask(listIndex: number, taskIndex: number, taskId: string) {
    try {
      await api.delete(`/task/${taskId}`)
      const aux = [...lists]

      if (listIndex < 0 || taskIndex < 0) return

      aux[listIndex].tasks.splice(taskIndex, 1)

      setLists(aux)
    } catch {
      alert('Não foi possível deletar a tarefa')
    }
  }

  async function onDragEnd(result: DropResult) {
    try {
      const { source, destination } = result

      if (!destination) return

      const aux = [...lists]

      const sourceListIndex = aux.findIndex(list => list.id === source.droppableId)
      const destListIndex = aux.findIndex(list => list.id === destination.droppableId)

      if (sourceListIndex < 0 || destListIndex < 0) return

      const [movedTask] = aux[sourceListIndex].tasks.splice(source.index, 1)
      aux[destListIndex].tasks.splice(destination.index, 0, movedTask)

      aux[destListIndex].tasks = aux[destListIndex].tasks.map((task, index) => {
        task.listPosition = index
        return task
      })

      const response = await api.put('/tasks/positions', aux[destListIndex].tasks.map((task, index) => ({
        taskId: task.id,
        position: index,
        listId: aux[destListIndex].id
      })))

      console.log(response.status)

      setLists(aux)
    } catch {
      alert('Não foi possível mudar a posição das tarefas')
    }
  }

  useEffect(() => {
    async function getLists() {
      try {
        const response = await api.get<{ list: IList[] }>('/listAll')

        setLists(response.data.list)
      } catch (error) {
        console.error(error)
      }
    }

    getLists()
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {taskSelected && <Modal deleteTask={deleteTask} close={() => setTaskSelected(null)} lists={lists} setLists={setLists} {...taskSelected} />
      }

      <div className={`flex items-center justify-center flex-col ${taskSelected ? 'opacity-20' : ''}`}>
        <p className='text-7xl'>Todo List</p>

        <div className='flex flex-row justify-around self-start items-start gap-5 mt-6'>

          {lists.map((list, index) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <List lists={lists} setLists={setLists} deleteList={deleteList} setTaskSelected={setTaskSelected} listIndex={index} {...list} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <CreateList addList={addList} proxPosition={lists.length} />
        </div>
      </div>
    </DragDropContext>
  )
}

export default App