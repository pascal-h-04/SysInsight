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
import Usermanagement from "./components/Adminpage/Usermanagement";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userID, setUserID] = useState(null); 

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    const storedUserID = localStorage.getItem("userID");
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
    setUserID(storedUserID);
  }, []);

  const successfullLogin = (admin, userID) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isAdmin", admin);
    localStorage.setItem("userID", userID);
    setIsLoggedIn(true);
    setIsAdmin(admin);
    setUserID(userID);
    {admin ? navigate("/usermanagement") : navigate("/auswertung")}
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
    localStorage.removeItem("userID");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserID(null);
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
                <Startseite isAdmin={isAdmin} userID={userID}/> 
            }
          />
          <Route
            path="/fragebogen"
            element={
  
                <Fragebogen isAdmin={isAdmin} userID={userID} />

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
                <Auswertung isAdmin={isAdmin} userID={userID} />
            }
          />
          <Route
            path="/angebotseite"
            element={
                <Angebotseite isAdmin={isAdmin} userID={userID}/>
            }
          />
          <Route
            path="/usermanagement"
            element={
                <Usermanagement isAdmin={isAdmin} userID={userID}/>
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
