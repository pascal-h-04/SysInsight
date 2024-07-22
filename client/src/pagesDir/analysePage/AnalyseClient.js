import "./AnalyseClientStyle.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverallMetric from "./OverallMetric";
import SingleMetric from "./SingleMetric";
import CompanyOffer from "./CompanyOffer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
import offersAtAnalyse from "../../data/OffersAtAnalyse";
import axios from "axios";

const AnalyseClient = ({ isLoggedIn, isAdmin, userID}) => {
  const navigate = useNavigate();
  const [einschaetzungenData, setEinschaetzungenData] = useState(null);
  const [scoreSecurity, setScoreSecurity] = useState(0);
  const [scoreKollaboration, setScoreKollaboration] = useState(0);
  const [scoreKommunikation, setScoreKommunikation] = useState(0);

  useEffect(() => {
    const fetchEinschaetzungen = async (userID) => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/einschaetzungen/${userID}`
        );
        setEinschaetzungenData(response.data);
        console.log("Einschätzungen:", response.data);
        const einschaetzung = response.data[0];
        setScoreSecurity(einschaetzung.ScoreSecurity);
        setScoreKollaboration(einschaetzung.ScoreKollaboration);
        setScoreKommunikation(einschaetzung.ScoreKommunikation);
      } catch (error) {
        console.error("Fehler beim Abrufen der Einschätzungen:", error);
      }
    };
    if (userID) {
      fetchEinschaetzungen(userID);
    } else {
      console.error("UserID not provided");
    }
  }, [isLoggedIn, isAdmin, userID]);

  const gesamtmetrik =
    ((scoreSecurity + scoreKollaboration + scoreKommunikation) / 15) * 100;

  const einzelmetriken = [
    { id: 1, title: "IT-Sicherheit", value: scoreSecurity },
    { id: 2, title: "Kollaboration", value: scoreKollaboration },
    { id: 3, title: "Kommunikation", value: scoreKommunikation },
  ];

  return (
    <Container className="page-container">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <OverallMetric value={gesamtmetrik} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={5} />
        <Col md={7}>
          <h1>Unsere Lösungen</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        {einzelmetriken.map((metrik, index) => (
          <React.Fragment key={index}>
            <Col md={5}>
              <SingleMetric title={metrik.title} value={metrik.value} />
            </Col>
            <Col md={7} className="mt-4 mt-md-0">
              <CompanyOffer
                key={offersAtAnalyse[index].id}
                angebot={offersAtAnalyse[index]}
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

export default AnalyseClient;
