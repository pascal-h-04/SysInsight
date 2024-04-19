import React from 'react';
import { Card } from 'react-bootstrap';
import './CompanyOffers.css';

const CompanyOffers = () => {
  return (
    <Card className="company-offers mb-4">
      <Card.Body>
        <Card.Title>Lösung 1</Card.Title>
        <Card.Text>
          Wir bieten Meeting-Plattformen für kollaboratives Arbeiten an.
          {/* Weitere Angebote hier */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyOffers;
