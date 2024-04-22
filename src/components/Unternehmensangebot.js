import React from 'react';
import { Card } from 'react-bootstrap';
import './Unternehmensangebot.css';

const Unternehmensangebot = ({ angebot }) => {
  return (
    <Card className="unternehmensangebote mb-4">
      <Card.Body>
        <Card.Title>{angebot.title}</Card.Title>
        <Card.Text>
          {angebot.description}
          {/* Weitere Angebote hier */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Unternehmensangebot;
