import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import './SingleMetricStyle.css';

const SingleMetric = ({ title, value }) => {
  let metricColorClass = '';
  if (value >= 4) {
    metricColorClass = 'high';
  } else if (value >= 2) {
    metricColorClass = 'medium';
  } else {
    metricColorClass = 'low';
  }

  return (
    <Card className={`single-metric ${metricColorClass} mb-4`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{`Bewertung: ${value}/5`}</Card.Text>
        <ProgressBar now={(value / 5) * 100} />
      </Card.Body>
    </Card>
  );
};

export default SingleMetric;
