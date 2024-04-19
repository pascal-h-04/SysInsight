import React from 'react';
import { Card } from 'react-bootstrap';
import './CompanyOffers.css';

const CompanyOffers = () => {
  return (
    <Card className="company-offers mb-4">
      <Card.Body>
        <Card.Title>Company Offers</Card.Title>
        <Card.Text>
          Beispielangebot 1: Beschreibung des Angebots
          {/* Weitere Angebote hier */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyOffers;
