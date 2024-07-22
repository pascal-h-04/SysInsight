import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate} from "react-router-dom";
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

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("isAdmin", isAdmin);
    if (userID) {
      localStorage.setItem("userID", userID);
    } else {
      localStorage.removeItem("userID");
    }
  }, [isLoggedIn, isAdmin, userID]);
  

  const successfullLogin = (admin, userID) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isAdmin", admin);
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
          userID={userID}
          handleLogout={logout}
        />
      </header>
      <main>
      <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID} />} />
          <Route path="/fragebogen" element={isLoggedIn ? <QuestionnairePage isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID} /> : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={<LoginPage loginSuccess={successfullLogin} isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID} />}
          />
          <Route
            path="/auswertung"
            element={isLoggedIn ? <AnalyseClient isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID}/> : <Navigate to="/login" />}
          />
          <Route
            path="/angebotseite"
            element={isLoggedIn ? <OfferPage isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID} /> : <Navigate to="/login" />}
          />
          <Route
            path="/usermanagement"
            element={isLoggedIn && isAdmin ? <UserManagement isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID} /> : <Navigate to="/login" />}
          />
          <Route path="/about-us" element={<AboutUs isLoggedIn={isLoggedIn} isAdmin={isAdmin} userID={userID}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
