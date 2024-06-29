import "./LoginScreen.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import ComicWelcome from "../../imgs/comic_welcome.png";
import axios from 'axios';

function LoginScreen({ loginSuccess }) {
  const navigate = useNavigate();

  const [loginLoading, setLoginLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);  // Modal beim ersten Laden anzeigen
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      if (response.data.auth) {
        const userID = response.data.userID; // Nutzer-ID aus der Antwort extrahieren
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          
          loginSuccess(response.data.isAdmin, userID); // Übergebe isAdmin an den loginSuccess-Handler
          
        }, 2000);
      } else {
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      setShowFailureModal(true);
    } finally {
      setLoginLoading(false);
    }
  };


  return (
    <>
      <div id="login-frame">
        <div id="login-photo-div">
          <img src={ComicWelcome} alt="SemanTec" />
        </div>
        <div id="login-form">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="show-password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="show-password">
                Show password
              </label>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="admin-login"
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label className="form-check-label" htmlFor="admin-login">
                Admin login
              </label>
            </div>
            <Button variant="success" type="submit" disabled={loginLoading}>
              {loginLoading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
            <br />
            <Button
              id="quick-access"
              variant="warning"
              onClick={() => loginSuccess(isAdmin)}
              disabled={loginLoading}
            >
              Quick access (Dev Only)
            </Button>
          </form>
        </div>
      </div>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nice to see you again!</Modal.Body>
      </Modal>

      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error || "Please check your credentials and try again."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFailureModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        
      <Modal show={showInfoModal} onHide={() => setShowInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Du möchtest deine Einschätzung und personalisierten Angebote sehen? Dann logge dich hier mit deinen Zugangsdaten, die du per E-Mail erhalten hast, ein!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowInfoModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default LoginScreen;
