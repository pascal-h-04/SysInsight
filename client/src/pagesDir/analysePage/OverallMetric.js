import React from "react";
import { ProgressBar, Card } from "react-bootstrap";
import "./OverallMetricStyle.css";

const OverallMetric = ({ value }) => {
  let metricColorClass = "";
  if (value >= 70) {
    metricColorClass = "high";
  } else if (value >= 30) {
    metricColorClass = "medium";
  } else {
    metricColorClass = "low";
  }

  return (
    <Card className={`overall-metric ${metricColorClass}`}>
      <Card.Body>
        <Card.Title>
          Ihr Digital Workplace Score ist insgesamt: 
        </Card.Title>
        <ProgressBar now={value} label={`${value}%`} />
      </Card.Body>
    </Card>
  );
};

export default OverallMetric;
