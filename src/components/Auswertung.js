import React, { useState } from 'react';
import GeneralMetric from './GeneralMetric';
import TopicMetric from './TopicMetric';
import CompanyOffers from './CompanyOffers';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Auswertung = () => {
  const [generalMetricValue, setGeneralMetricValue] = useState(75);

  const [topicMetrics, setTopicMetrics] = useState([
    { id: 1, title: "Mobiles Arbeiten", value: 7 },
    { id: 2, title: "Flexibles Arbeitszeitmodell", value: 8 },
    { id: 3, title: "Home Office Ausstattung", value: 6 },
    { id: 4, title: "Kommunikationswerkzeuge", value: 9 }
  ]);

  const [companyOffers, setCompanyOffers] = useState([
    { id: 1, title: "Angebot 1", description: "Beschreibung für Angebot 1", image: "bild1.jpg" },
    { id: 2, title: "Angebot 2", description: "Beschreibung für Angebot 2", image: "bild2.jpg" },
    { id: 3, title: "Angebot 3", description: "Beschreibung für Angebot 3", image: "bild3.jpg" }
  ]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <GeneralMetric value={generalMetricValue} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          {topicMetrics.map(metric => (
            <TopicMetric key={metric.id} title={metric.title} value={metric.value} />
          ))}
        </Col>
        <Col md={6} className="mt-md-0 mt-4"> 
          <h1>Unsere Lösungen</h1>
          {companyOffers.map(offer => (
            <CompanyOffers key={offer.id} offer={offer} />
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
