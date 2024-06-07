import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import Navigation from "./components/Navigation";
import Startseite from "./components/Startseite";
import Fragebogen from "./components/Fragebogen";
import Angebotseite from "./components/Angebotseite";
import Auswertung from "./components/Auswertung";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const successfullLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={logout} />
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
            path="/startseite"
            element={isLoggedIn ? <Startseite /> : <Navigate to="/" />}
          />
          <Route
            path="/angebotseite"
            element={isLoggedIn ? <Angebotseite /> : <Navigate to="/" />}
          />
          <Route
            path="/fragebogen"
            element={isLoggedIn ? <Fragebogen /> : <Navigate to="/" />}
          />
          <Route
            path="/auswertung"
            element={isLoggedIn ? <Auswertung /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/startseite" : "/login"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
