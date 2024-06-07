import "./Angebot.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { CiMail } from "react-icons/ci";

const Angebot = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Angelboot</Card.Title>
        <Card.Text> Angebot :&#041; </Card.Text>
        <Card.Img variante="top" src="logo.png" className="angebot-img" />
        <Button>
          <CiMail size={20} /> Angebot erhalten{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Angebot;
