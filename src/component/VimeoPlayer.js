import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

const VimeoPlayer = ({ videoId, userId }) => {
  const playerRef = useRef(null);
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [lastSavedPercentage, setLastSavedPercentage] = useState(0); // 마지막으로 저장된 이수율
  const [completionMessage, setCompletionMessage] = useState(''); // 이수 완료 메시지

  // 서버로부터 마지막 시청 시간을 불러오는 함수
  const fetchLastWatchTime = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/vimeo/last-watch-time?userId=1234&videoId=${videoId}`);
      const data = await response.json();
      return data.lastWatchTime || 0;
    } catch (error) {
      console.error('Failed to fetch last watch time:', error);
      return 0;
    }
  };

  // 마지막 시청 이수율을 서버에 저장하는 함수
  const saveWatchProgress = async (percentage) => {
    try {
      // 비율을 문자열로 변환하고, userId와 videoId를 원하는 형식으로 설정
      const data = {
        "userId": "lava", // 문자열로 userId를 설정
        "videoId": 1017916934,  // 비디오 ID를 숫자로 설정
        "watchedPercentage": percentage.toFixed(1), // 소수점 1자리로 변환하여 문자열로 설정
      };

      await fetch('http://localhost:8080/api/vimeo/save-watch-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
      });

      console.log('Progress saved:', data);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  useEffect(() => {
    const initializePlayer = async () => {
      const lastTime = await fetchLastWatchTime(); // 서버로부터 마지막 시청 시간 불러오기
      const player = new Player(playerRef.current, {
        id: videoId,
        width: 800,
        start: lastTime,
      });

      player.on('timeupdate', (data) => {
        const { duration, seconds } = data;
        const percentage = (seconds / duration) * 100;

        setWatchedPercentage(percentage.toFixed(2));

        // 사용자가 비디오를 10% 이상 시청했을 때만 저장
        if (percentage - lastSavedPercentage >= 10) {
          saveWatchProgress(percentage);
          setLastSavedPercentage(percentage);
        }

        // 이수 완료 여부 확인
        if (percentage >= 100) {
          setCompletionMessage('이수 완료! 수고하셨습니다.');
        } else {
          setCompletionMessage(''); // 이수 완료가 아닐 경우 메시지 초기화
        }
      });

      // 비디오가 끝났을 때 서버에 100% 완료 저장
      player.on('ended', () => {
        saveWatchProgress(100); // 재생이 완료되면 100%로 저장
        setLastSavedPercentage(100); // 마지막 저장 이수율 업데이트
        setCompletionMessage('이수 완료! 수고하셨습니다.'); // 비디오 종료 시 메시지 설정
        console.log('Video ended');
      });

      return () => {
        player.unload();
      };
    };

    initializePlayer();
  }, [videoId, userId]);

  return (
    <div className="vimeo-player-container">
      <div ref={playerRef} className="vimeo-player"></div>
      <p className="watched-percentage">Watched: {watchedPercentage}%</p>
      {completionMessage && <p className="completion-message">{completionMessage}</p>} {/* 이수 완료 메시지 표시 */}
    </div>
  );
};

export default VimeoPlayer;
