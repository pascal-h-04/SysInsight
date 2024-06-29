import "./Auswertung.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gesamtmetrik from "./Gesamtmetrik";
import Einzelmetrik from "./Einzelmetrik";
import Unternehmensangebot from "./Unternehmensangebot";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
import dreiAngeboteBeiAuswertung from "../../data/dreiAngeboteBeiAuswertung";
import axios from "axios";

const Auswertung = ({ isAdmin, userID }) => {
  const navigate = useNavigate();
  const [einschaetzungenData, setEinschaetzungenData] = useState(null);
  const [scoreSecurity, setScoreSecurity] = useState(0);
  const [scoreKollaboration, setScoreKollaboration] = useState(0);
  const [scoreKommunikation, setScoreKommunikation] = useState(0);

  useEffect(() => {
    const fetchEinschaetzungen = async (userID) => {
      try {
        const response = await axios.get(`http://localhost:3002/api/einschaetzungen/${userID}`);
        setEinschaetzungenData(response.data);
        console.log('Einschätzungen:', response.data);
        const einschaetzung = response.data[0];
        setScoreSecurity(einschaetzung.ScoreSecurity);
        setScoreKollaboration(einschaetzung.ScoreKollaboration);
        setScoreKommunikation(einschaetzung.ScoreKommunikation);
      } catch (error) {
        console.error('Fehler beim Abrufen der Einschätzungen:', error);
       
      }
    };
    if (userID) {
      fetchEinschaetzungen(userID);
    } else {
      console.error('UserID not provided');
      // Handle error condition (optional)
    }
  }, [userID]);
  

  // Gesamtmeterik für Development (beispielhaft)
  const gesamtmetrikFürDev = (scoreSecurity + scoreKollaboration + scoreKommunikation)/3;

  // Einzelmetriken für Development
  const einzelmetrikenFürDev = [
    { id: 1, title: "IT-Sicherheit", value: scoreSecurity},
    { id: 2, title: "Kollaboration", value: scoreKollaboration },
    { id: 3, title: "Kommunikation", value: scoreKommunikation },
  ];

  return (
    <Container className="page-container">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <Gesamtmetrik value={gesamtmetrikFürDev} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={5}></Col>
        <Col md={7}>
          <h1>Unsere Lösungen</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        {einzelmetrikenFürDev.map((metrik, index) => (
          <React.Fragment key={index}>
            <Col md={5}>
              <Einzelmetrik title={metrik.title} value={metrik.value} />
            </Col>
            <Col md={7} className="mt-4 mt-md-0">
              <Unternehmensangebot
                key={dreiAngeboteBeiAuswertung[index].id}
                angebot={dreiAngeboteBeiAuswertung[index]}
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => navigate("/angebotseite")}
            className="zurAngebotseite"
          >
            <MdOutlineLocalOffer size={30} />
            Zu Ihren personalisierten Angeboten
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auswertung;
