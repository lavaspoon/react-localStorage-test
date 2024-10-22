import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoList from './component/VideoList';
import VideoPlayerPage from './component/VideoPlayerPage';
import VideoPlayer from './component/VideoPlayer';

import './VideoList.css'; // 외부 스타일 시트 추가
import './VideoPlayerPage.css'; // 외부 스타일 시트 추가
import './VimeoPlayer.css'; // 외부 스타일 시트 추가
import './VideoPlayer.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:videoId" element={<VideoPlayerPage />} />
        <Route path="/test" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;