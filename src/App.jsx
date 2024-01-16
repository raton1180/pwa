import { useState } from 'react'
import './App.css'
import { StickyNavbar } from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import io from 'socket.io-client';

// let socket;
// const END_POINT = "http://localhost:7000";

const socket = io('http://localhost:7000', {
  transports: ['websocket']
});

function App() {
  const [count, setCount] = useState(0)

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('connect', () => {
    console.log('connected!');
    // socket.emit('greet', { message: 'Hello Mr.Server!' });
  });

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
