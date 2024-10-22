import React from 'react';
import { useParams } from 'react-router-dom';
import VimeoPlayer from './VimeoPlayer';

const VideoPlayerPage = () => {
    const { videoId } = useParams(); // URL에서 videoId 추출

    return (
        <div className="video-player-page">
            <h1 className="video-player-title">Now Playing</h1>
            <VimeoPlayer videoId={videoId} userId="lava" /> {/* 사용자 ID는 예시로 고정 */}
            <div className="instructions">
                <p>Watch the video and track your progress.</p>
                <p>Your progress will be saved automatically.</p>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
