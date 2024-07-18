import "./LoginPageStyle.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import ComicWelcome from "../../imgs/comic_welcome.png";
import axios from "axios";

function LoginPage({ loginSuccess }) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const Name = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        Name,
        pw,
      });

      if (response.data.auth) {
        const userID = response.data.userID;
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          if (response.data.isAdmin === false) {
            loginSuccess(false, userID);
          } else {
            loginSuccess(response.data.isAdmin, userID);
          }
        }, 2000);
      } else {
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                autoComplete="on"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Passwort
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
                Passwort anzeigen
              </label>
            </div>

            <Button
              variant="success"
              type="submit"
              disabled={loginLoading}
              id="submit-btn"
            >
              {loginLoading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Login"
              )}
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
          Du möchtest deine Einschätzung und personalisierten Angebote sehen?
          Dann logge dich hier mit deinen Zugangsdaten, die du per E-Mail
          erhalten hast, ein!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInfoModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginPage;
