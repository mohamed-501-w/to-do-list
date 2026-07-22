import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'

export default function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateTask />} />
      <Route path='/task/:id' element={<EditTask />} />
      
    </Routes>
  )
}
