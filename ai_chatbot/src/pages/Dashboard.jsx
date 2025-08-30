import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Card } from "./Card";
import "./Dashboard.css";

// TikTok Icon Component
const TikTokIcon = () => (
  <svg className="tiktok-icon" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-3.183.9v.002a6.29 6.29 0 0 0-3.039 5.436 6.257 6.257 0 0 0 3.98 5.778 6.301 6.301 0 0 0 6.624-1.319A6.287 6.287 0 0 0 16.133 15.672V8.686a8.228 8.228 0 0 0 3.456 0V6.686z"
      fill="url(#tiktok-gradient)"
    />
    <defs>
      <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF0050" />
        <stop offset="50%" stopColor="#00F2EA" />
        <stop offset="100%" stopColor="#FF0050" />
      </linearGradient>
    </defs>
  </svg>
);

// User Icon Component
const UserIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Creator Icon Component
const CreatorIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Animated background */}
      <div className="bg-animation">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>

      {/* Floating particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-with-icon">
            <TikTokIcon />
            <h1 className="title">TikTok AI Assistant</h1>
          </div>
          <p className="subtitle">
            Your intelligent companion for content creation and discovery. Choose your path to unlock AI-powered features.
          </p>
        </header>

        {/* Options */}
        <section aria-label="Choose your user type">
          <div className="options-grid">
            {/* User Card */}
            <Card className="option-card user-card">
              <div className="card-icon">
                <UserIcon />
              </div>
              <h2 className="option-title">I'm a User</h2>
              <p className="option-desc">
                Discover trending content, get navigation help, and find what's popular on TikTok
              </p>
              <Button onClick={() => navigate("/user")} className="continue-btn">
                Continue as User
              </Button>
            </Card>

            {/* Creator Card */}
            <Card className="option-card creator-card">
              <div className="card-icon">
                <CreatorIcon />
              </div>
              <h2 className="option-title">I'm a Creator</h2>
              <p className="option-desc">
                Generate scripts, get upload assistance, and create engaging content with AI
              </p>
              <Button onClick={() => navigate("/creator")} className="continue-btn">
                Continue as Creator
              </Button>
            </Card>
          </div>
        </section>

        {/* Footer accent */}
        <div className="footer-accent">
          <div className="accent-line"></div>
        </div>
      </div>
    </div>
  );
}