import "./Auswertung.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Gesamtmetrik from "./Gesamtmetrik";
import Einzelmetrik from "./Einzelmetrik";
import Unternehmensangebot from "./Unternehmensangebot";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MdOutlineLocalOffer } from "react-icons/md";
import dreiAngeboteBeiAuswertung from "../../data/dreiAngeboteBeiAuswertung";

const Auswertung = ({ isAdmin }) => {
  const navigate = useNavigate();

  const gesamtmetrikFürDev = 72;
  const einzelmetrikenFürDev = [
    { id: 1, title: "Security", value: 7 },
    { id: 2, title: "Office-Tools", value: 8 },
    { id: 3, title: "Kommunikations-Tools", value: 2 },
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
