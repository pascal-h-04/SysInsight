import './Fragen.css';
import jsonFragen from '../data/fragen.json';
import { Form, Col, Row, Badge } from 'react-bootstrap';
import React from 'react';
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
            {jsonFragen.map((question) => (
                <React.Fragment key={question.id}>
                    {question.category && <Badge bg="secondary">{question.category}</Badge>}
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={7}>
                        {question.question}
                        {question.mandatory && <span className="mandatory-star">*</span>}
                    </Form.Label>
                    <Col sm={5}>
                        {renderQuestion(question)}
                    </Col>
                    </Form.Group>
                </React.Fragment>
            ))}
            </Form>
        </div>
      );
    };
    
    export default Fragen;