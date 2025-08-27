import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <div className="header">
                <h1 className="title">TikTok AI Assistant</h1>
                <p className="subheading">Your intelligent companion for content creation and discovery. Choose your path to unlock AI-powered features.</p>
            </div>
            <div className="options-container">
                <div className="option user-option">
                    <div className="icon user-icon"></div>
                    <h2>I'm a User</h2>
                    <p>Discover trending content, get navigation help, and find what's popular on TikTok</p>
                    <button className="continue-button" onClick={() => navigate('/user')}>Continue as User</button>
                </div>
                <div className="option creator-option">
                    <div className="icon creator-icon"></div>
                    <h2>I'm a Creator</h2>
                    <p>Generate scripts, get upload assistance, and create engaging content with AI</p>
                    <button className="continue-button">Continue as Creator</button>
                </div>
            </div>
        </div>
    );
}