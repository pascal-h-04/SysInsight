import './Startseite.css';
import { useState } from 'react';
import Fragen from './Fragen.js';
import { Button } from 'react-bootstrap';
import Auswertung from './Auswertung.js';
import Angebotseite from './Angebotseite'; // Importiere die Angebotsseite


const Startseite = () => {
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showAngebotseite, setShowAngebotseite] = useState(false);

    const navigateToAngebotseite = () => {
        setShowAngebotseite(true);
        setShowStartScreen(false);
        setShowQuestions(false);
        setShowResult(false);
    };

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
            {showResult && <Auswertung navigateToAngebotseite={navigateToAngebotseite} />} {/* navigateToAngebotseite als Prop übergeben */}
            {showAngebotseite && <Angebotseite />}
        </div>

    );
};
export default Startseite;