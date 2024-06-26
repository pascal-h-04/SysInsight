import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// geplant: import Router from "./Router"; und dann <Router /> in return
import LoginScreen from "./components/Loginseite/LoginScreen";
import Navigation from "./components/Navigation";
import Profile from "./components/Profilseite/Profile";
import AboutUs from "./components/Über_Uns_Seite/AboutUs";
import Startseite from "./components/Startseite/Startseite";
import Fragebogen from "./components/Fragebogenseite/Fragebogen";
import Angebotseite from "./components/Angebotsseite/Angebotseite";
import Auswertung from "./components/Auswertungsseite/Auswertung";
import Adminmanagement from "./components/Adminpage/Adminmanagement";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const successfullLogin = (admin) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isAdmin", admin);
    setIsLoggedIn(true);
    setIsAdmin(admin);
    {admin ? navigate("/adminmanagement") : navigate("/auswertung")}
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <header>
        <Navigation
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={logout}
        />
      </header>
      <main>
        <Routes>
        <Route
            path="/"
            element={
                <Startseite isAdmin={isAdmin} /> 
            }
          />
          <Route
            path="/fragebogen"
            element={
  
                <Fragebogen isAdmin={isAdmin} />

            }
          />
          <Route
            path="/login"
            element={
                <LoginScreen loginSuccess={successfullLogin} />
            }
          />
          
          <Route
            path="/auswertung"
            element={
                <Auswertung isAdmin={isAdmin} />
            }
          />
          <Route
            path="/angebotseite"
            element={
                <Angebotseite isAdmin={isAdmin} />
            }
          />
          <Route
            path="/adminmanagement"
            element={
                <Adminmanagement isAdmin={isAdmin} />
            }
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route path="/about-us" element={<AboutUs />} />
        
        </Routes>
      </main>
    </div>
  );
}

export default App;
