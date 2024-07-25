// src/components/Modal.js
import React from 'react';
import './Modal.css'; // 모달의 스타일을 정의하는 CSS 파일

function Modal({ isOpen, onClose, title, subtitle, content }) {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <h3 className="modal-subtitle">{subtitle}</h3>
                </div>
                <div className="modal-body">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}

export default Modal;
