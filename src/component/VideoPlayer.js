import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const intervalRef = useRef(null);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);

      // 타이머 시작
      intervalRef.current = setInterval(() => {
        setWatchTime(prevTime => {
          // watchTime이 totalDuration을 초과하지 않도록 조정
          if (totalDuration > 0) {
            const maxWatchTime = totalDuration * 1000; // milliseconds
            return Math.min(prevTime + 100, maxWatchTime); // totalDuration을 초과하지 않도록 설정
          }
          return prevTime + 100;
        });
      }, 100);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    console.log(`Total watch time: ${watchTime / 1000} seconds`);
    // 영상 종료 시 타이머 중지
  };

  const handleDuration = (duration) => {
    setTotalDuration(duration); // 전체 길이를 설정
  };

  // 이수율 계산 (100%를 초과하지 않도록 설정)
  const completionRate = totalDuration > 0 ? Math.min((watchTime / (totalDuration * 1000)) * 100, 100) : 0;

  return (
    <div className="video-player-container">
      <h1>교육 영상</h1>
      <ReactPlayer
        className="react-player"
        url='https://vimeo.com/993425392'
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded} // 영상 종료 시 호출
        onDuration={handleDuration}
        controls // 기본 재생 컨트롤 활성화
        width="100%" // 100% 너비 설정
        height="600px" // 높이 설정
      />

      <div className="watch-time">
        <h3>Total Watch Time: {Math.floor(watchTime / 1000)} seconds</h3>
        <h3>Completion Rate: {completionRate.toFixed(2)}%</h3> {/* 이수율 표시 */}
      </div>

      <div className="controls">
        <button onClick={handlePause}>Pause</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;