import "./Fragebogen.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import jsonFragen from "../data/fragebogen.json";
import {
  Form,
  Col,
  Row,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { MdInsights } from "react-icons/md";

const Fragebogen = () => {
  const navigate = useNavigate();

  const renderQuestion = (question) => {
    switch (question.type) {
      case "text":
        return (
          <Form.Control
            type="text"
            placeholder="Text eingeben"
            required={question.mandatory}
          />
        );
      case "select":
        return (
          <Form.Select as="select" required={question.mandatory}>
            {question.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      case "range":
        return (
          <Form.Range
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            required={question.mandatory}
          />
        );
      case "checkbox":
        return (
          <Form.Check
            type="switch"
            className="switch-checkbox"
            required={question.mandatory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="questions-wrapper">
      <div className="info-icon">
        <OverlayTrigger
          trigger="click"
          key="leftInfoPopover"
          placement="left"
          overlay={
            <Popover id="left-info-popover">
              <Popover.Header as="h3">Info</Popover.Header>
              <Popover.Body>
                <p>
                  Hier findest du allgemeine Informationen und unterstützende
                  Hinweise zum Fragebogen ...
                </p>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">
            <BsInfoCircle size={24} />
          </Button>
        </OverlayTrigger>
      </div>
      <Form>
        {jsonFragen.map((question) => (
          <React.Fragment key={question.id}>
            {question.category && (
              <div className="category-header">{question.category}</div>
            )}
            <Form.Group as={Row} className="mb-3 question-row">
              <Form.Label column sm={7} className="question">
                {question.question}
                {question.mandatory && (
                  <span className="mandatory-star">*</span>
                )}
              </Form.Label>
              <Col sm={5}>{renderQuestion(question)}</Col>
            </Form.Group>
          </React.Fragment>
        ))}
        <Button
          variant="primary"
          onClick={() => navigate("/auswertung")}
          className="zur-auswertung-btn"
        >
          <MdInsights size={30} /> Zur Auswertung
        </Button>
      </Form>
    </div>
  );
};

export default Fragebogen;
