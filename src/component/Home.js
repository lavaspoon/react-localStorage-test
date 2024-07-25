// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdditionalComponent from './AdditionalComponent';

function Home() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        const savedText = localStorage.getItem('inputText');
        if (savedText) {
            setText(savedText);
        }

        const visited = localStorage.getItem('hasVisited');
        if (visited === 'true') {
            setHasVisited(true);
        }
    }, []);

    useEffect(() => {
        document.title = hasVisited ? 'React Input Saved' : 'React Input Form';
    }, [hasVisited]);

    const handleInputChange = (event) => {
        setText(event.target.value);
        localStorage.setItem('inputText', event.target.value);
    };

    const handleButtonClick = () => {
        navigate(`/${encodeURIComponent(text)}`);
        localStorage.setItem('hasVisited', 'true');
        setHasVisited(true);
    };

    const resetState = () => {
        localStorage.removeItem('inputText');
        localStorage.removeItem('additionalInputText');
        localStorage.removeItem('hasVisited');

        setText('');
        setHasVisited(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>{hasVisited ? 'React Input Saved' : 'React Input Form'}</h1>
                <input
                    type="text"
                    value={text}
                    onChange={handleInputChange}
                    placeholder="Enter text here"
                />
                <button onClick={handleButtonClick}>Go to New Page</button>
                <button onClick={resetState}>Reset State</button>
                <AdditionalComponent /> {/* 추가 컴포넌트 렌더링 */}
            </header>
        </div>
    );
}

export default Home;
