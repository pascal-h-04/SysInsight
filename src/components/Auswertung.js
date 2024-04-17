import React from 'react';
import './Auswertung.css';
import { Container, Row, Col, ProgressBar, Card, ListGroup, Button, Form } from 'react-bootstrap';

const Auswertung = () => {
    // Sample data for the metrics
    const generalMetric = 7.5;
    const topicMetrics = [
        { topic: 'Mobiles Arbeiten', metric: 8 },
        { topic: 'Meeting-Plattformen', metric: 2 },
        { topic: 'Kollaborative Tools', metric: 9 },
        { topic: 'Topic 4', metric: 4},
        { topic: 'Topic 5', metric: 8.5 },
    ];

    // Sample data for company offers
    const companyOffers = [
        {
            title: 'Digital Workplace Beratung',
            description: 'Erfahren Sie, wie Sie Ihren digitalen Arbeitsplatz optimieren und modernisieren können.'
        },
        {
            title: 'Implementierung von Collaboration-Tools',
            description: 'Nutzen Sie leistungsstarke Collaboration-Tools, um die Zusammenarbeit in Ihrem Unternehmen zu verbessern.'
        },
        {
            title: 'Schulungen und Workshops',
            description: 'Bilden Sie Ihre Mitarbeiter in den neuesten Technologien und Arbeitsmethoden aus.'
        },
    ];

    // Function to determine color based on metric value
    const getVariantColor = (value) => {
        if (value <= 2) {
            return 'danger'; // red
        } else if (value <= 6) {
            return 'warning'; // yellow
        } else {
            return 'success'; // green
        }
    };

    return (
        <Container fluid className="mt-5">
            <Row>
                <Col md={12} className="text-center mb-4">
                    <h2>Ihr Digital Workplace ist:</h2>
                    <ProgressBar now={generalMetric * 10} label={`${generalMetric}/10`} variant="success" />
                </Col>
            </Row>

            <Row className="gy-4">
                <Col md={6}>
                    <Card className="p-4 shadow-lg">
                        <h3 className="mb-3">Topic Metrics</h3>
                        <p>
                            Hier sehen Sie eine detaillierte Auswertung der verschiedenen Metriken Ihres Digital Workplace. Jedes Thema wird anhand seiner Leistung bewertet und farblich hervorgehoben.
                        </p>
                        {topicMetrics.map((item, index) => (
                            <div key={index} className="mb-3">
                                <h4>{item.topic}</h4>
                                <ProgressBar
                                    now={item.metric * 10}
                                    label={`${item.metric}/10`}
                                    variant={getVariantColor(item.metric)}
                                />
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-4 shadow-lg">
                        <h3 className="mb-3">Company Offers</h3>
                        <p>
                            Entdecken Sie unsere maßgeschneiderten Angebote, die speziell darauf abzielen, die Leistung und Effizienz Ihres Digital Workplace zu verbessern.
                        </p>
                        <ListGroup>
                            {companyOffers.map((offer, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h4>{offer.title}</h4>
                                        <p>{offer.description}</p>
                                    </div>
                                    <Form.Check type="checkbox" />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button variant="primary" className="mt-3">Angebot erstellen</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Auswertung;
