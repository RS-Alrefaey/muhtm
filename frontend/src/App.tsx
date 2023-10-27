import { Sign } from "crypto";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";
import Login from "./comps/pages/LoginPage";
import Signup from "./comps/pages/SignUpPage";
import MainDashPage from "./comps/pages/MainDashPage";
import HistoryPage from "./comps/pages/HistoryPage";
import HomePage from "./comps/pages/HomePage";
import ProfilePage from "./comps/pages/ProfilePage";
import AboutUsPage from "./comps/pages/AboutUsPage";
import ContactUsPage from "./comps/pages/ContactUsPage";

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

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
