import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicPage from './publicPage';
import LogInSignUp from './logInSignUp';
import AdminPage from './admin';
import ModeratorPage from './moderator';
import UserPage from './user';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/logInSignUp" element={<LogInSignUp/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<PublicPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
