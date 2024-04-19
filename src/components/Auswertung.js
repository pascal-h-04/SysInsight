import React from 'react';
import GeneralMetric from './GeneralMetric';
import TopicMetric from './TopicMetric';
import CompanyOffers from './CompanyOffers';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Auswertung = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <GeneralMetric />
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <TopicMetric title="Mobiles Arbeiten" value={7} />
          <TopicMetric title="Flexibles Arbeitszeitmodell" value={8} />
          <TopicMetric title="Home Office Ausstattung" value={6} />
          <TopicMetric title="Kommunikationswerkzeuge" value={9} />
          {/* Weitere TopicMetric Komponenten hier */}
        </Col>
        <Col md={6}>
        <h1> Unsere Lösungen</h1>
          <CompanyOffers />
          <CompanyOffers />
          <CompanyOffers />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="primary">Angeboote anzeigen</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auswertung;
