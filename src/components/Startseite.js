import './Startseite.css';
import { useState } from 'react';
import Fragen from './Fragen.js';
import { Button } from 'react-bootstrap';

const Startseite = () => {
    const [showStartScreen, setShowStartScreen] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    return (
        <div className="page-content">
            {showStartScreen && <>
                <h1>SysInsight</h1>
                <Button onClick={() => {
                    setShowStartScreen(false);
                    setShowQuestions(true);
                }}>Ersteinschätzung durchführen</Button>
            </>}

            {showQuestions && <Fragen />}
         </div>
    );
};
export default Startseite;