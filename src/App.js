import socketIo from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import './App.css';

const socket = socketIo.connect('http://localhost:3001');


function App() {
  return (
    <Routes>
      <Route path='' element={<Home/>} />
      <Route path='/chat' element={<Chat socket={socket}/>} />
    </Routes>
  );
}

export default App;
