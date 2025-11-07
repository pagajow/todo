
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import TaskListPage from './pages/TaskListPage'
import TaskAddPage from './pages/TaskAddPage'
import TaskEditPage from './pages/TaskEditPage'
import TaskViewPage from './pages/TaskViewPage'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskListPage />} />
        <Route path="add" element={<TaskAddPage />} />
        <Route path="edit/:id" element={<TaskEditPage />} />
        <Route path="view/:id" element={<TaskViewPage />} />
      </Route>
    </Routes>
  )
}

export default App
