import "./questionnairePageStyle.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonFragen from "../../data/Questionnaire.json";
import RadioSelector from "./components/RadioSelector.js";
import TextBoxSelector from "./components/TextBoxSelector.js";
import SingleSelector from "./components/SingleSelector.js";
import MultipleSelector from "./components/MultipleSelector.js";
import SliderSelector from "./components/SliderSelector.js";
import CheckBoxSelector from "./components/CheckBoxSelector.js";
import SwitchSelector from "./components/SwitchSelector.js";
import DateSelector from "./components/DateSelector.js";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import { MdInsights } from "react-icons/md";
import CustomPopup from "./CustomPopup.js";
import InfoPopover from "./InfoPopover.js";

const QuestionnairePage = () => {
  const navigate = useNavigate();

  const initializeFormData = () => {
    const initialData = {};
    jsonFragen.forEach((question) => {
      initialData[question.id] =
        question.defaultValue !== undefined
          ? question.defaultValue
          : question.type === "slider"
          ? 3
          : "";
    });
    return initialData;
  };

  const [formData, setFormData] = useState(initializeFormData());
  const [errors, setErrors] = useState({});

  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleInputChange = (questionId, value, type = "input") => {
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
      if (validatedValue) {
        setErrors((prevErrors) => ({ ...prevErrors, [questionId]: false }));
      }
    }
  };

  const updateErrors = (id, condition) => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: condition }));
  };

  const validateInput = (value, type, id) => {
    const inputValidationRules = {
      string: (x) => x.replace(/[^a-zA-Z\säöüÄÖÜß()-]/g, ""),
      email: (x) => {
        const cleanedValue = x.toLowerCase();
        const isValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(
          cleanedValue
        );
        updateErrors(id, !isValid);
        return cleanedValue;
      },
      phone: (x) => {
        const cleanedValue = x
          .replace(/[^0-9+\s]/g, "")  
          .replace(/(?!^)\+/g, "")  
          .slice(0, 16); 
  
        const isValid = /^[+]?[0-9\s+]{1,15}$/.test(cleanedValue); 
        updateErrors(id, !isValid);
        return isValid ? cleanedValue : "";
      },
    };

    if (inputValidationRules[type]) {
      const cleanedValue = inputValidationRules[type](value);
      if (type === "string") {
        const isValid = cleanedValue === value && value !== "";
        updateErrors(id, !isValid);
      }
      return cleanedValue;
    }
    return value;
  };

  const inputComponentsMap = {
    radiogroup: RadioSelector,
    text: TextBoxSelector,
    "single-select": SingleSelector,
    "multi-select": MultipleSelector,
    slider: SliderSelector,
    toggle: SwitchSelector,
    checkbox: CheckBoxSelector,
    email: TextBoxSelector,
    tel: TextBoxSelector,
    date: DateSelector,
  };

  const renderQuestion = (question) => {
    const GenericComponent = inputComponentsMap[question.type];
    if (!GenericComponent) return null;
    const commonPropsOfInputComponents = {
      question,
      formData,
      handleInputChange,
      errors,
    };
    return <GenericComponent {...commonPropsOfInputComponents} />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const enrichedFormData = {}; //Fragen mit internalCategory
    let totalScore = 0;
    let count = 0;

    jsonFragen.forEach((question) => {
      if (question.mandatory && !formData[question.id]) {
        newErrors[question.id] = true;
      }
      if (formData[question.id]) {
        const answer = formData[question.id];
        let score = 0;
        if (Array.isArray(answer)) {
          // Wenn die Antwort ein Array ist (Multi-Select)
          answer.forEach((option) => {
            if (question.options && question.options[option] !== undefined) {
              totalScore += question.options[option];
              count += 1;
            }
          });
          if (count > 0) {
            score = Math.round(totalScore / count);
          }
        } else {
          // Single-Select oder andere Typen
          if (question.options && question.options[answer] !== undefined) {
            score = question.options[answer];
          } else if (answer === true || answer === "Ja") {
            score = 5;
          } else if (answer === false || answer === "Nein") {
            score = 0;
          } else {
            score = answer;
          }
        }

        enrichedFormData[question.id] = {
          answer: answer,
          internalCategory: question.internalCategory || "Uncategorized",
          weight: question.weight || 0,
          score: score,
        };

        totalScore = 0;
        count = 0;
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
          navigate("/login", { state: { formData } });
        }, 2000);
      }, 2000);

      try {
        console.log("Fragebogen_1 Form Data: ", enrichedFormData);
        const response = await fetch("http://localhost:3001/api/submit", {
          method: "POST",
          headers: {
            "Contentt -Type": "application/json",
          },
          body: JSON.stringify(enrichedFormData),
        });
        console.log("Response status:", response.status);
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
              Zur Auswertung
            </>
          )}
        </Button>
        
      </Form>
      <CustomPopup
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title="Analyse läuft ..."
        body="Alle notwendigen Daten wurden eingegeben und erfolgreich für die Analyse übermittelt."
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

export default QuestionnairePage;
