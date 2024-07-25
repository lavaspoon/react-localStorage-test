// src/components/NewPage.js
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewPage() {
    const { text } = useParams(); // URL 경로에서 텍스트 값을 추출합니다.
    const navigate = useNavigate();

    useEffect(() => {
        // 1초 후 홈 페이지로 돌아가기
        const timer = setTimeout(() => {
            navigate('/');
        }, 1000);

        // 컴포넌트가 언마운트될 때 타이머를 정리
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>New Page</h1>
                <p>This page will redirect to Home after 1 second.</p>
                <p>Entered Text: {decodeURIComponent(text)}</p> {/* URL에서 추출한 텍스트를 표시합니다. */}
            </header>
        </div>
    );
}

export default NewPage;
