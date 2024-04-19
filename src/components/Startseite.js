import './Startseite.css';
import { useState } from 'react';
import Fragen from './Fragen.js';
import { Button } from 'react-bootstrap';
import Angebotsseite from './Angebotseite.js';

const Startseite = () => {
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    return (
        <div className="page-content">
            {showStartScreen && <>
                <h1>SysInsight</h1>
                <Button onClick={() => {
                    setShowStartScreen(false);
                    setShowQuestions(true);
                }}>Ersteinschätzung durchführen</Button>
                <Button onClick={() => {
                    setShowOffer(true); setShowStartScreen(false);
                    setShowQuestions(false);}}>Angebote ansehen zorryyyy ist erstmal nur temp</Button>
            </>}

            {showQuestions && <Fragen />}
            {showOffer && <Angebotsseite />}    
        </div>

    );
};
export default Startseite;