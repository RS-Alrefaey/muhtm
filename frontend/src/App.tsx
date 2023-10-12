
import { Sign } from 'crypto';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';

import './App.css';
import Login from './comps/LoginPage';
import Signup from './comps/SignUpPage';
import NavSidebar from './comps/NavSidebar';
import MainDashPage from './comps/MainDashPage';
import HistoryPage from './comps/HistoryPage';
import MainNavBar from './comps/MainNavBar';
import HomePage from './comps/HomePage';
import ProfilePage from './comps/ProfilePage';
import AboutUsPage from './comps/AboutUsPage';
import ContactUsPage from './comps/ContactUsPage';



function App() {

  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          <Route path="/dashboard" element={<MainDashPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />


          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>






    </div>
  );
}

export default App;
