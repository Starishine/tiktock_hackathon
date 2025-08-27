import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./Button";
import { Card } from "./Card";

import "./Dashboard.css"; 

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="title">TikTok AI Assistant</h1>
          <p className="subtitle">
            Your intelligent companion for content creation and discovery. Choose your path to unlock AI-powered features.
          </p>
        </header>

        {/* Options */}
        <section aria-label="Choose your user type">
          <div className="options-grid">
            {/* User Card */}
            <Card className="option-card user-card">
              <div className="card-content">
                <h2 className="option-title">I'm a User</h2>
                <p className="option-desc">
                  Discover trending content, get navigation help, and find what's popular on TikTok
                </p>
                <Button onClick={() => navigate("/user")} className="continue-btn">
                  Continue as User
                </Button>
              </div>
            </Card>

            {/* Creator Card */}
            <Card className="option-card creator-card">
              <div className="card-content">
                <h2 className="option-title">I'm a Creator</h2>
                <p className="option-desc">
                  Generate scripts, get upload assistance, and create engaging content with AI
                </p>
                <Button onClick={() => navigate("/creator")} className="continue-btn">
                  Continue as Creator
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
