import './App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
  }
  return (
    <div>
      <header>
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      </header>
      <main>
        {!isLoggedIn ? <LoginScreen loginSuccess={handleLoginSuccess} />
        : <>
          <h1>SysInsight</h1>
        </> }
      </main>
    </div>
  );
}

export default App;
