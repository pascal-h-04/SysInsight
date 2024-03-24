import './Fragen.css';
import jsonFragen from '../data/fragen.json';
import { Form, Col, Row, Badge } from 'react-bootstrap';
const Fragen = () => {
    const renderQuestion = (question) => {
        switch (question.type) {
          case 'text':
            return (
              <Form.Control 
                type="text" 
                placeholder={question.question} 
                required={question.mandatory} 
              />
            );
          case 'select':
            return (
              <Form.Control as="select" required={question.mandatory}>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </Form.Control>
            );
          case 'range':
            return (
              <Form.Control 
                type="range" 
                min={question.min} 
                max={question.max} 
                step={question.step} 
                required={question.mandatory} 
              />
            );
          default:
            return null;
        }
      };
    
      return (
        <div id="question-wrapper">
            <Form>
            {jsonFragen.map((question) => (<>
                {question.category && <Badge bg="secondary">{question.category}</Badge>}
                <Form.Group as={Row} key={question.id} className="mb-3">
                <Form.Label column sm={5}>
                    {question.question}
                    {question.mandatory && <span className="mandatory-star">*</span>}
                </Form.Label>
                <Col sm={5}>
                    {renderQuestion(question)}
                </Col>
                </Form.Group>
            </>
            ))}
            </Form>
        </div>
      );
    };
    
    export default Fragen;