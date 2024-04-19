import React, { useState } from 'react';
import Angebot from './Angebot.js';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Angebotsseite.css";

const Angebotseite = () => { // Fix: Add '=>' after 'const Angebotseite'
    const [angebote, setAngebote] = useState([
        { id: 1, name: "Angebot 1", description: "Beschreibung für Angebot 1", image: "bild1.jpg" },
        { id: 2, name: "Angebot 2", description: "Beschreibung für Angebot 2", image: "bild2.jpg" },
        { id: 3, name: "Angebot 3", description: "Beschreibung für Angebot 3", image: "bild3.jpg" }
    ]);

    return (
        <div>
           <h1>Ihre personalisierten Angebote </h1>
           <Row> 
            {angebote.map(angebot => (
              <Col sm={4} key={angebot.id}>
                <Angebot angebot={angebot} />
              </Col>
            ))}
           </Row>
        </div>
    );
}
export default Angebotseite; 
