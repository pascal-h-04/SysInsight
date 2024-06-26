import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginScreen loginSuccess={successfullLogin} />
              ) : (
                <Navigate to="/startseite" />
              )
            }
          />
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
            path="/auswertung"
            element={
              isLoggedIn ? (
                <Auswertung isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/angebotseite"
            element={
              isLoggedIn ? (
                <Angebotseite isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/adminmanagement"
            element={
              isLoggedIn ? (
                <Adminmanagement isAdmin={isAdmin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/about-us" element={<AboutUs />} />
        
        </Routes>
      </main>
    </div>
  );
}

export default App;
