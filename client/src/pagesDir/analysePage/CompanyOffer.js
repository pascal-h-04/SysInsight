import "./CompanyOfferStyle.css";
import React from "react";
import { Card } from "react-bootstrap";

const CompanyOffer = ({ angebot }) => {
  return (
    <Card className="unternehmensangebote mb-4">
      <div className="image-container">
        <img src={angebot.image} alt="Offer Bild" className="angebot-image" />
      </div>
      <Card.Body>
        <Card.Title>{angebot.title}</Card.Title>
        <Card.Text>{angebot.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyOffer;
