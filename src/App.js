import './App.css';
import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';
import Startseite from './components/Startseite';
import Angebotseite from './components/Angebotseite';

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
          <Startseite />
        </> }
      </main>
    </div>
  );
}

export default App;
