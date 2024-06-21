import "./Fragebogen.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonFragen from "../../data/fragebogen.json";
import {
  Knopfgruppe,
  Textfeld,
  Einzelauswahl,
  Mehrfachauswahl,
  Schieberegler,
  Ankreuzbox,
  Datumsauswahl,
} from "./Eingabeformate";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import { MdInsights } from "react-icons/md";
import CustomPopup from "./CustomPopup.js";
import InfoPopover from "./InfoPopover.js";

const Fragebogen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleChange = (questionId, value, type = "input") => {
    if (type === "date") {
      setFormData((prevData) => ({ ...prevData, [questionId]: value }));
    } else {
      const validationTypes = {
        unternehmensname: "string",
        rolle: "string",
        email: "email",
        telefonnummer: "phone",
      };
      const validatedValue = validationTypes[questionId]
        ? validateInput(value, validationTypes[questionId], questionId)
        : value;
      setFormData((prevData) => ({
        ...prevData,
        [questionId]:
          type === "select-multiple"
            ? typeof validatedValue === "string"
              ? validatedValue.split(",")
              : validatedValue
            : validatedValue,
      }));
    }
  };

  const updateErrors = (id, condition) => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: condition }));
  };

  const validateInput = (value, type, id) => {
    const inputValidationRules = {
      string: (x) => x.replace(/[^a-zA-Z\säöüÄÖÜß()-]/g, ""),
      email: (x) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(x.toLowerCase()),
      phone: (x) => {
        x = x
          .replace(/[^0-9+]/g, "")
          .replace(/\++/g, "+")
          .slice(0, 15);
        return /^[+]?[0-9]{1,15}$/.test(x);
      },
    };
    if (inputValidationRules[type]) {
      const cleanedValue = inputValidationRules[type](value);
      const isValid =
        type === "email" || type === "phone"
          ? cleanedValue
          : cleanedValue === value && value !== "";
      updateErrors(id, !isValid);
      return cleanedValue;
    }
    return value;
  };

  const inputComponentsMap = {
    "category-btns": Knopfgruppe,
    text: Textfeld,
    "single-select": Einzelauswahl,
    "multi-select": Mehrfachauswahl,
    slider: Schieberegler,
    checkbox: Ankreuzbox,
    email: Textfeld,
    tel: Textfeld,
    date: Datumsauswahl,
  };

  const renderQuestion = (question) => {
    const GenericComponent = inputComponentsMap[question.type];
    if (!GenericComponent) return null;
    const commonPropsOfInputComponents = {
      question,
      formData,
      setFormData,
      handleChange,
      errors,
    };
    return <GenericComponent {...commonPropsOfInputComponents} />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const enrichedFormData = {};
    jsonFragen.forEach((question) => {
      if (
        question.mandatory &&
        !formData[question.id] &&
        question.type !== "slider"
      ) {
        newErrors[question.id] = true;
      }
      if (formData[question.id]) {
        enrichedFormData[question.id] = {
          answer: formData[question.id],
          internalCategory: question.internalCategory || "Uncategorized",
          weight: question.weight || 0,
        };
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setEvaluationLoading(true);
      setTimeout(() => {
        setEvaluationLoading(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/auswertung", { state: { formData } });
        }, 2000);
      }, 2000);

      try {
        console.log("Fragebogen_1 Form Data: ", enrichedFormData);
        const response = await fetch("http://localhost:3001/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrichedFormData),
        });
        console.log("Response status:", response.status);
        /*if (response.ok) {
          const data = await response.json();
          console.log('Response data:', data); // Debugging: Zeige die Antwortdaten an
          navigate('/auswertung', { state: { results: data } });
        } else {
          console.error('Response not OK:', response.status, response.statusText);
          alert('Error submitting the form');
        }*/
      } catch (error) {
        console.log("Fragebogen_2 Form Data: ", enrichedFormData);
        console.error("Error:", error);
        alert("Error submitting the form");
      }
    } else {
      setShowFailureModal(true);
    }
  };

  return (
    <div id="questions-wrapper" className={evaluationLoading ? "loading" : ""}>
      <InfoPopover />
      <Form>
        {jsonFragen.map((question) => (
          <React.Fragment key={question.id}>
            {question.category && (
              <div className="category-header">{question.category}</div>
            )}
            <Form.Group as={Row} className="mb-3 question-row">
              <Form.Label column sm={5} className="question">
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
          type="submit"
          disabled={evaluationLoading}
          onClick={handleSubmit}
          className="zur-auswertung-btn"
        >
          {evaluationLoading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            <>
              <MdInsights size={30} />
              Zur Auswertung (mit validierung)
            </>
          )}
        </Button>
        <Button
          variant="primary"
          disabled={evaluationLoading}
          onClick={() => navigate("/auswertung", { state: { formData } })}
        >
          Zur Auswertung (ohne validierung - Dev only)
        </Button>
      </Form>
      <CustomPopup
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title="Auswertung läuft ..."
        body="Alle notwendigen Daten wurden eingegeben und erfolgreich für die Auswertung übermittelt."
      />
      <CustomPopup
        show={showFailureModal}
        onHide={() => setShowFailureModal(false)}
        title="Fehlgeschlagen!"
        body="Bitte fülle alle Pflichtfelder aus, bevor du das Formular absenden."
      />
    </div>
  );
};

export default Fragebogen;
