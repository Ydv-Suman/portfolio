import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './routes/Home'
import Skills from './routes/Skills'

function App() {
  return(
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/skills' element={<Skills/>}/>
      </Routes>
    </div>
  )
}

export default App
