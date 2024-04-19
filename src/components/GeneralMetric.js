import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';

const GeneralMetric = () => {
  const progressValue = 75; // Beispielwert
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Ihr Digital Workplace ist:</Card.Title>
        <ProgressBar now={progressValue} label={`${progressValue}%`} />
      </Card.Body>
    </Card>
  );
};

export default GeneralMetric;
