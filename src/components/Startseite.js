import './Startseite.css';
import { useState } from 'react';
import Fragen from './Fragen.js';
import { Button } from 'react-bootstrap';
import Auswertung from './Auswertung.js';

const Startseite = () => {
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showResult, setShowResult] = useState(false);

    return (
        <div className="page-content">
            {showStartScreen && <>
                <h1>SysInsight</h1>
                <Button onClick={() => {
                    setShowStartScreen(false);
                    setShowQuestions(true);
                }}>Ersteinschätzung durchführen</Button>
                
              
                <h1></h1>
                <h1></h1>
                <h1>Auswertung</h1>
                <Button onClick={() => {
                    setShowResult(true); 
                    setShowStartScreen(false);
                    setShowQuestions(false);
                }}>Auswertung ansehen nur temp</Button>

                
            </>}
            

            {showQuestions && <Fragen />}
            {showResult && <Auswertung />}
        </div>

    );
};
export default Startseite;