import { FC, useEffect, useState } from 'react'
import Nav from './components/Nav/Nav'
import Left from './components/Left/Left'
import Mid from './components/Mid/Mid'
import Right from './components/Right/Right'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useParams } from 'react-router-dom'
import './main.css'
import { jsonSchemaFindByIDAction } from './api'

const App: FC = () => {
  const [name, setName] = useState<string>('')
  const [editTime, setEditTime] = useState<string>('')
  const { id } = useParams()
  if (!id) {
    throw new Error(`Invalid id: ${id}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await jsonSchemaFindByIDAction(id)
      console.log(result.info.name)
      setName(result.info.name)
      setEditTime(result.info.updatedAt)
    }
    fetchData()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='app'>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Nav name={name} editTime={editTime} />
        </div>
        <div>
          <Left />
          <Mid />
          <Right />
        </div>
      </DndProvider>
    </div>
  )
}

export default App
