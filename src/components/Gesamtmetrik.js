import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import './Gesamtmetrik.css'; 

const Gesamtmetrik = ({ value }) => {
  let metricColorClass = '';
  if (value >= 8) {
    metricColorClass = 'high';
  } else if (value >= 5) {
    metricColorClass = 'medium';
  } else {
    metricColorClass = 'low';
  }

  return (
    <Card className={`gesamtmetrik ${metricColorClass}`}>
      <Card.Body>
        <Card.Title>Ihr Digital Workplace ist:</Card.Title>
        <ProgressBar now={value} label={`${value}%`} />
      </Card.Body>
    </Card>
  );
};

export default Gesamtmetrik;
