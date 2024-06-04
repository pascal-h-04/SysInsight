import React, { useState, useEffect } from 'react';
import Angebot from './Angebot.js';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Angebotsseite.css";
import jsonAngebote  from '../data/angebote.json';

const Angebotseite = () => {
    const [angebote, setAngebote] = useState([]);
    useEffect(() => {
      setAngebote(jsonAngebote);
  }, []);

    return (
      <div>
      <h1>Ihre personalisierten Angebote</h1>
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
  
