import './LoginScreen.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import ComicWelcome from '../imgs/comic_welcome.png';

function LoginScreen({ loginSuccess }) {
  const accounts = [
    { username: 'a', password: 'a' }
  ];
  localStorage.setItem('accounts', JSON.stringify(accounts));

  const [loginLoading, setLoginLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
    const accountExists = storedAccounts.some(account => account.username === username && account.password === password);
    setTimeout(() => {
      if (accountExists) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          loginSuccess();
        }, 2000);
      } else {
        setShowFailureModal(true);
      }
      setLoginLoading(false);
    }, 2000);
  };
  return (
    <>
    <div id="login-frame">
      <div id="login-photo-div">
        <img src={ComicWelcome} alt="SemanTec" />
      </div>
      <div id="login-form">
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" autoComplete="off" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="password"/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="show-password" onChange={() => setShowPassword(!showPassword)} />
            <label className="form-check-label" htmlFor="show-password">Show password</label>
          </div>
          <Button variant="success" onClick={handleLogin}>Submit</Button>
          <Button id="quick-access" variant="warning" onClick={loginSuccess}>Quick access (Dev Only)</Button>
          <div id="login-spinner">
            {loginLoading ? <Spinner animation="border" variant="primary"/> : null}
          </div>  
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
        <Modal.Body>Please check your credentials and try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFailureModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginScreen;