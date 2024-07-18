import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// geplant: import Router from "./Router"; und dann <Router /> in return
import LoginPage from "./pagesDir/loginPage/LoginPage";
import Navigation from "./pagesDir/Navigation";
import AboutUs from "./pagesDir/aboutUsPage/AboutUs";
import HomePage from "./pagesDir/homePage/HomePage";
import QuestionnairePage from "./pagesDir/questionnaire/questionnairePage";
import OfferPage from "./pagesDir/offerPage/OfferPage";
import AnalyseClient from "./pagesDir/analysePage/AnalyseClient";
import UserManagement from "./pagesDir/adminPage/UserManagement";

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
    localStorage.setItem("isAdmin", admin);
    localStorage.setItem("isAdmin", true);
    localStorage.setItem("userID", userID);
    setIsLoggedIn(true);
    setIsAdmin(admin);
    setUserID(userID);
    admin ? navigate("/angebotseite") : navigate("/auswertung");
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
            element={<HomePage isAdmin={isAdmin} userID={userID} />}
          />
          <Route
            path="/fragebogen"
            element={<QuestionnairePage isAdmin={isAdmin} userID={userID} />}
          />
          <Route
            path="/login"
            element={<LoginPage loginSuccess={successfullLogin} />}
          />

          <Route
            path="/auswertung"
            element={<AnalyseClient isAdmin={isAdmin} userID={userID} />}
          />
          <Route
            path="/angebotseite"
            element={<OfferPage isAdmin={isAdmin} userID={userID} />}
          />
          <Route
            path="/usermanagement"
            element={<UserManagement isAdmin={isAdmin} userID={userID} />}
          />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
