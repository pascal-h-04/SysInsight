import "./Angebotseite.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Angebot from "./Angebot.js";
import { Row, Col, Button } from "react-bootstrap";
import jsonAngebote from "../data/angebote.json";
import { IoMdArrowRoundBack } from "react-icons/io";

const Angebotseite = () => {
  const navigate = useNavigate();
  const [angebote, setAngebote] = useState([]);
  useEffect(() => {
    setAngebote(jsonAngebote);
  }, []);

  return (
    <div id="angebotseite">
      <Button variant="primary" onClick={() => navigate("/auswertung")}>
        <IoMdArrowRoundBack size={25} />
        Zurück zur Auswertung
      </Button>
      <h1>Ihre personalisierten Angebote</h1>
      <Row>
        {angebote.map((angebot) => (
          <Col sm={4} key={angebot.id}>
            <Angebot angebot={angebot} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Angebotseite;
