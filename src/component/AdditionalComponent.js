// src/components/AdditionalComponent.js
import React, { useEffect, useState } from 'react';

function AdditionalComponent() {
    const [additionalText, setAdditionalText] = useState('');

    const handleAdditionalInputChange = (event) => {
        setAdditionalText(event.target.value);
        localStorage.setItem('additionalInputText', event.target.value);
    };

    useEffect(() => {
        const savedAdditionalText = localStorage.getItem('additionalInputText');
        if (savedAdditionalText) {
            setAdditionalText(savedAdditionalText);
        }
    }, []);

    return (
        <div>
            <input
                type="text"
                value={additionalText}
                onChange={handleAdditionalInputChange}
                placeholder="Enter additional text here"
            />
        </div>
    );
}

export default AdditionalComponent;
