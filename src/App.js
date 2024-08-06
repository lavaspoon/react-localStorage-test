// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import NewPage from './component/NewPage';
import ChatResponse from './component/ChatResponse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:text" element={<NewPage />} />
        <Route path="/codeblock" element={<ChatResponse />} />
      </Routes>
    </Router>
  );
}

export default App;
