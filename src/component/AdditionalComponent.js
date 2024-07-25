// src/components/AdditionalComponent.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // 모달 컴포넌트 import

function AdditionalComponent() {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 상단 텍스트 필드 값 변경 처리
    const handleTopInputChange = (event) => {
        setTopText(event.target.value);
        localStorage.setItem('topInputText', event.target.value);
    };

    // 하단 텍스트 필드 값 변경 처리
    const handleBottomInputChange = (event) => {
        setBottomText(event.target.value);
        localStorage.setItem('bottomInputText', event.target.value);
    };

    useEffect(() => {
        const savedTopText = localStorage.getItem('topInputText');
        if (savedTopText) {
            setTopText(savedTopText);
        }

        const savedBottomText = localStorage.getItem('bottomInputText');
        if (savedBottomText) {
            setBottomText(savedBottomText);
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="input-group">
                <input
                    type="text"
                    value={topText}
                    onChange={handleTopInputChange}
                    placeholder="Enter top text here"
                />
            </div>
            <div className="input-group">
                <input
                    type="text"
                    value={bottomText}
                    onChange={handleBottomInputChange}
                    placeholder="Enter bottom text here"
                />
            </div>
            <button onClick={openModal}>Show Stored Text</button>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={topText || 'No Title'}
                subtitle="Completed"
                content={bottomText || 'No Content'}
            />
        </div>
    );
}

export default AdditionalComponent;
