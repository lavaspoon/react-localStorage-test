// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import NewPage from './component/NewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:text" element={<NewPage />} /> {/* URL 경로에서 파라미터를 받습니다. */}
      </Routes>
    </Router>
  );
}

export default App;
