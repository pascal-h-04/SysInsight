import "./Fragebogen.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonFragen from "../data/fragebogen.json";
import {
  Form,
  Col,
  Row,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Spinner,
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { MdInsights } from "react-icons/md";
import {
  Slider,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  TextField,
  Radio,
  Grid,
  RadioGroup,
  Tooltip,
} from "@mui/material";
// npm install @mui/x-date-pickers @mui/material @emotion/react @emotion/styled dayjs !
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/de";

const Fragebogen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleInputChange = (questionId) => (event) => {
    let { value, type } = event.target;

    if (questionId === "unternehmensname" || questionId === "rolle")
      value = validateStringInput(value, questionId);
    else if (questionId === "email") value = validateEmail(value);
    else if (questionId === "telefonnummer") value = validatePhone(value);

    setFormData((prevData) => ({
      ...prevData,
      [questionId]:
        type === "select-multiple"
          ? typeof value === "string"
            ? value.split(",")
            : value
          : value,
    }));
  };
  const handleDateChange = (questionId) => (date) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: date,
    }));
  };

  const validateStringInput = (value, id) => {
    const initialValue = value;
    value = value.replace(/[^a-zA-Z\säöüÄÖÜß()-]/g, "");
    if (value !== initialValue || value === "") {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: false }));
    }
    return value;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    value = value.toLowerCase();
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    }
    return value;
  };

  const validatePhone = (value) => {
    const initialValue = value;
    value = value
      .replace(/[^0-9+\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    value = value.startsWith("+")
      ? "+" + value.slice(1).replace(/\+/g, "")
      : value.replace(/\+/g, "");
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    if (value !== initialValue || /[^0-9+\s]/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, telefonnummer: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, telefonnummer: false }));
    }
    return value;
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "category-btns":
        return (
          <div className="category-btns">
            <RadioGroup
              row
              aria-label={question.id}
              name={question.id}
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
            >
              <Grid container spacing={2}>
                {Object.keys(question.categories).map((category, index) => (
                  <Grid item xs={6} key={index}>
                    <FormControlLabel
                      value={category}
                      control={<Radio />}
                      label={category}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            {errors[question.id] && (
              <div className="error-text">Bitte wählen Sie eine Option.</div>
            )}
          </div>
        );
      case "text":
        return (
          <TextField
            fullWidth
            type="text"
            placeholder={question.placeholder}
            inputProps={{ maxLength: question.maxLength }}
            value={formData[question.id] || ""}
            onChange={handleInputChange(question.id)}
            error={errors[question.id]}
          />
        );
      case "single-select":
        return (
          <FormControl fullWidth error={errors[question.id]}>
            <Select
              displayEmpty
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
            >
              <MenuItem disabled value="">
                <em>Bitte auswählen</em>
              </MenuItem>
              {Object.keys(question.options).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "multi-select":
        return (
          <FormControl fullWidth error={errors[question.id]}>
            <Select
              multiple
              displayEmpty
              value={formData[question.id] || []}
              onChange={handleInputChange(question.id)}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Bitte auswählen</em>;
                }
                return selected.join(", ");
              }}
            >
              <MenuItem disabled value="">
                <em>Bitte auswählen</em>
              </MenuItem>
              {Object.keys(question.options).map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    checked={(formData[question.id] || []).indexOf(option) > -1}
                  />
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "slider":
        return (
          <Tooltip title={question.info} placement="right" arrow>
            <Slider
              defaultValue={question.defaultValue}
              value={formData[question.id] || question.defaultValue}
              valueLabelDisplay={question.valueLabelDisplay}
              step={question.step}
              marks={question.marks.map((mark) => ({
                value: parseInt(mark.replace("+", "")),
                label: mark,
              }))}
              min={question.min}
              max={question.max}
              onChange={(event, newValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  [question.id]: newValue,
                }))
              }
            />
          </Tooltip>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!formData[question.id]}
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    [question.id]: event.target.checked,
                  }))
                }
              />
            }
          />
        );
      case "email":
        return (
          <TextField
            fullWidth
            type="email"
            placeholder={question.placeholder}
            value={formData[question.id] || ""}
            onChange={handleInputChange(question.id)}
            error={errors[question.id]}
          />
        );
      case "tel":
        return (
          <TextField
            fullWidth
            type="tel"
            placeholder={question.placeholder}
            inputProps={{ maxLength: question.maxLength }}
            value={formData[question.id] || ""}
            onChange={handleInputChange(question.id)}
            error={errors[question.id]}
          />
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={question.label}
              value={formData[question.id] || null}
              onChange={handleDateChange(question.id)}
              minDate={dayjs().add(1, "day")}
              format="DD.MM.YYYY"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    jsonFragen.forEach((question) => {
      if (
        question.mandatory &&
        !formData[question.id] &&
        question.type !== "slider"
      ) {
        newErrors[question.id] = true;
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
    } else {
      setShowFailureModal(true);
    }
  };

  return (
    <div id="questions-wrapper" className={evaluationLoading ? "loading" : ""}>
      <div className="info-icon">
        <OverlayTrigger
          trigger="click"
          rootClose
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
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Success! All relevant data provided for the evaluation.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Form submitted successfully!</Modal.Body>
      </Modal>
      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Failure! Some mandatory fields are missing.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill in all mandatory fields before submitting the form.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFailureModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Fragebogen;
