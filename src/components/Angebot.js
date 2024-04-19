import Card from "react-bootstrap/Card";

const Angebot = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>hi</Card.Title>
                <Card.Text> Heute kommt das neue Taylor Swift Album raus </Card.Text>
                <Card.Img variante="top" src="logo.png" />
            </Card.Body>
        </Card>  
    ); 
}

export default Angebot;