import { useState } from 'react'
import './App.css'
import { StickyNavbar } from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StickyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Post />} />
      </Routes>
    </>
  )
}

export default App
