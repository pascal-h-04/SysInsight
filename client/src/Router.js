import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";

import LoginScreen from "./components/Loginseite/LoginScreen";
import Profile from "./components/Profilseite/Profile";
import AboutUs from "./components/Über_Uns_Seite/AboutUs";
import Startseite from "./components/Startseite/Startseite";
import Fragebogen from "./components/Fragebogenseite/Fragebogen";
import Angebotseite from "./components/Angebotsseite/Angebotseite";
import Auswertung from "./components/Auswertungsseite/Auswertung";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/startseite"} />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/startseite" element={<Startseite />} />
        <Route path="/fragebogen" element={<Fragebogen />} />
        <Route path="/auswertung" element={<Auswertung />} />
        <Route path="/angebotseite" element={<Angebotseite />} />
      </Route>
    </Routes>
  );
}

export default Router;
