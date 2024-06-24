import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "../api/axiosConfigWithToken";

function PrivateRoutes() {
  const [currentUser, setCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("/verifyToken", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCurrentUser(response.data.loggedIn);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Wird geladen ...</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
