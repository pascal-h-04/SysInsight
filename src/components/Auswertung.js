import React, { useState } from 'react';
import Gesamtmetrik from './Gesamtmetrik';
import Einzelmetrik from './Einzelmetrik';
import Unternehmensangebot from './Unternehmensangebot';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Auswertung = () => {
  const [gesamtmetrikWert, setGesamtmetrikWert] = useState(75);

  const [einzelmetriken, setEinzelmetriken] = useState([
    { id: 1, title: "Mobiles Arbeiten", value: 7 },
    { id: 2, title: "Flexibles Arbeitszeitmodell", value: 8 },
    { id: 3, title: "Home Office Ausstattung", value: 6 },
    { id: 4, title: "Kommunikationswerkzeuge", value: 9 }
  ]);

  const [unternehmensangebote, setUnternehmensangebote] = useState([
    { id: 1, title: "Angebot 1", description: "Beschreibung für Angebot 1", image: "bild1.jpg" },
    { id: 2, title: "Angebot 2", description: "Beschreibung für Angebot 2", image: "bild2.jpg" },
    { id: 3, title: "Angebot 3", description: "Beschreibung für Angebot 3", image: "bild3.jpg" }
  ]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <Gesamtmetrik value={gesamtmetrikWert} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          {einzelmetriken.map(metrik => (
            <Einzelmetrik key={metrik.id} title={metrik.title} value={metrik.value} />
          ))}
        </Col>
        <Col md={6} className="mt-md-0 mt-4"> 
          <h1>Unsere Lösungen</h1>
          {unternehmensangebote.map(angebot => (
            <Unternehmensangebot key={angebot.id} angebot={angebot} />
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="primary">Angebote anzeigen</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auswertung;
