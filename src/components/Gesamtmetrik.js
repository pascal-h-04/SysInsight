import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';

const Gesamtmetrik = ({ value }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Ihr Digital Workplace ist:</Card.Title>
        <ProgressBar now={value} label={`${value}%`} />
      </Card.Body>
    </Card>
  );
};

export default Gesamtmetrik;
