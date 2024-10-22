import React from 'react';
import { Link } from 'react-router-dom'; // 페이지 이동을 위해 react-router-dom 사용

const VideoList = () => {
    // 비디오 데이터 (id, title, thumbnail)
    const videos = [
        { id: 1017916933, title: "Introduction to Programming", thumbnail: "https://i.vimeocdn.com/video/thumbnail_1.jpg" },
        { id: 1017916934, title: "Advanced JavaScript", thumbnail: "https://i.vimeocdn.com/video/thumbnail_2.jpg" },
        { id: 1017916935, title: "React Basics", thumbnail: "https://i.vimeocdn.com/video/thumbnail_3.jpg" },
    ];

    return (
        <div className="video-list-container">
            <h1 className="page-title">Educational Video Library</h1>
            <ul className="video-list">
                {videos.map((video) => (
                    <li key={video.id} className="video-item">
                        <Link to={`/video/${video.id}`} className="video-link">
                            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                            <p className="video-title">{video.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;
