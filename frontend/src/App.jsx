import { useState } from 'react'
import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Detect from './pages/Detect';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
        <Route path='/image-detection' element={<Detect/>}/>
      </Routes>
  );
} 

export default App;
