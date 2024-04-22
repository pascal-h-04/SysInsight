import React, { useState } from 'react';
import Gesamtmetrik from './Gesamtmetrik';
import Einzelmetrik from './Einzelmetrik';
import Unternehmensangebot from './Unternehmensangebot';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Angebotseite from './Angebotseite'
import { useState } from 'react';

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
          <CompanyOffers />
          <CompanyOffers />
          <CompanyOffers />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="primary">Angebot senden</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auswertung;
