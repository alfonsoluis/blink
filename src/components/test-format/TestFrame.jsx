import React from 'react';
import './TestFrame.css';

const TestFrame = ({ children, chapter, subject }) => {
    return (
        <div className="test-frame">
            <nav className="header">
                <div className="chapter">{ chapter }</div>
                <div className="subject">{ subject }</div>
            </nav>
            <div className="test-content">{ children }</div>
        </div>
    );
};

export default TestFrame;