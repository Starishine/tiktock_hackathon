import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import UserInterface from './pages/UserInterface';
import CreatorInterface from './pages/CreatorInterface';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserInterface />} />\ 
        <Route path="/creator" element={<CreatorInterface />} />
        /creator
      </Routes>
    </Router>
  );
}

