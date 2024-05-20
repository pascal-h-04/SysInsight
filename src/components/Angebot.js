import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Angebot = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Angelboot</Card.Title>
                <Card.Text> Angebot :&#041; </Card.Text>
                <Card.Img variante="top" src="logo.png" />
                <h1></h1>
                <Button>Angebot an meine E-Mail senden </Button>
            </Card.Body>
        </Card>  
    ); 
}

export default Angebot;