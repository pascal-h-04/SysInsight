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
} from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { MdInsights } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import {
  Box,
  Slider,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  TextField,
  Radio,
  Grid,
  RadioGroup,
  Tooltip,
} from "@mui/material";

const Fragebogen = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [unternehmensnameError, setUnternehmensnameError] = useState(false);
  const [rolleError, setRolleError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mandatoryErrors, setMandatoryErrors] = useState({});

  const handleInputChange = (questionId) => (event) => {
    let { value } = event.target;
    const { type } = event.target;

    if (questionId === "unternehmensname")
      value = validateUnternehmensname(value);
    else if (questionId === "rolle") value = validateRolle(value);
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

  const validateUnternehmensname = (value) => {
    const initialValue = value;
    value = value.replace(/[^a-zA-Z\säöüÄÖÜß()-]/g, "");
    if (value !== initialValue || value === "") {
      setUnternehmensnameError(true);
    } else {
      setUnternehmensnameError(false);
    }
    return value;
  };

  const validateRolle = (value) => {
    const initialValue = value;
    value = value.replace(/[^a-zA-Z\säöüÄÖÜß()-]/g, "");
    if (value !== initialValue || value === "") {
      setRolleError(true);
    } else {
      setRolleError(false);
    }
    return value;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    value = value.toLowerCase();
    if (!emailRegex.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
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
    if (
      value !== initialValue ||
      /[^0-9+\s]/.test(value) ||
      (value.indexOf("+") > 0 && initialValue.startsWith("+"))
    ) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    return value;
  };

  const [customizingMode, setCustomizingMode] = useState(false);
  const customizeQuestions = () => {
    setCustomizingMode(!customizingMode);
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
                {question.categories.map((category, index) => (
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
          </div>
        );
      case "text":
        return (
          <FormControl sx={{ width: 300 }}>
            <TextField
              fullWidth
              type="text"
              placeholder={question.placeholder}
              inputProps={{ maxLength: question.maxLength }}
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
              error={
                question.id === "unternehmensname"
                  ? unternehmensnameError
                  : question.id === "rolle"
                  ? rolleError
                  : false
              }
              helperText={
                question.id === "unternehmensname"
                  ? unternehmensnameError
                    ? "Eingabe ungültig"
                    : ""
                  : question.id === "rolle"
                  ? rolleError
                    ? "Eingabe ungültig"
                    : ""
                  : ""
              }
            />
          </FormControl>
        );
      case "single-select":
        return (
          <FormControl sx={{ width: 300 }}>
            <Select
              displayEmpty
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
            >
              <MenuItem disabled value="">
                <em>Bitte auswählen</em>
              </MenuItem>
              {question.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "multi-select":
        return (
          <FormControl sx={{ width: 300 }}>
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
              {question.options.map((option) => (
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
          <Box sx={{ width: 300 }}>
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
          </Box>
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
            error={emailError}
            helperText={emailError ? "Eingabe ungültig" : ""}
          />
        );
      case "tel":
        return (
          <FormControl>
            <TextField
              fullWidth
              type="tel"
              placeholder={question.placeholder}
              inputProps={{ maxLength: question.maxLength }}
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
              error={phoneError}
              helperText={phoneError ? "Eingabe ungültig" : ""}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const errors = {};
    jsonFragen.forEach((question) => {
      if (question.mandatory && !formData[question.id]) {
        errors[question.id] = true;
      }
    });
    if (Object.keys(errors).length > 0) {
      setMandatoryErrors(errors);
      alert("Mandatory fields not filled in!");
    } else {
      setMandatoryErrors({});
      navigate("/auswertung", { state: { formData } });
    }
  };

  return (
    <div id="questions-wrapper">
      {isAdmin && (
        <>
          <Button variant="success" onClick={customizeQuestions}>
            {customizingMode ? "Anpassung beenden" : "Fragebogen anpassen"}
          </Button>
          {customizingMode && (
            <>
              {" "}
              <Button variant="success">
                <IoIosAddCircle size={20} /> Frage hinzufügen
              </Button>{" "}
              <Button variant="success">
                <FaSave size={20} /> Änderungen speichern
              </Button>
            </>
          )}
        </>
      )}
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
              <Form.Label column sm={5} className="question">
                {question.question}
                {question.mandatory && (
                  <span className="mandatory-star">*</span>
                )}
              </Form.Label>
              <Col sm={5}>{renderQuestion(question)}</Col>
              {customizingMode && !question.category && (
                <Col sm={2}>
                  <Button variant="light">
                    <MdEdit size={20} />
                  </Button>{" "}
                  <Button variant="light">
                    <MdDelete size={20} />
                  </Button>
                </Col>
              )}
            </Form.Group>
          </React.Fragment>
        ))}
        <Button
          variant="primary"
          onClick={handleSubmit}
          className="zur-auswertung-btn"
        >
          <MdInsights size={30} /> Zur Auswertung (mit validierung)
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/auswertung", { state: { formData } })}
        >
          Zur Auswertung (ohne validierung - Dev only)
        </Button>
      </Form>
    </div>
  );
};

export default Fragebogen;
