import "./AnalyseClientStyle.css";
import React from "react";
import { Card } from "react-bootstrap";

const CompanyOffer = ({ angebot }) => {
  return (
    <Card className="unternehmensangebot mb-4">
      <img src={angebot.image} alt="Offer Bild" className="angebot-image" />
      <Card.Body>
        <Card.Title>{angebot.title}</Card.Title>
        <Card.Text>{angebot.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyOffer;
