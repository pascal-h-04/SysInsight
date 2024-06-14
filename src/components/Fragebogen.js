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
  const handleInputChange = (questionId) => (event) => {
    const { value } = event.target;
    const { type } = event.target;
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
          </div>
        );
      case "text":
        return (
          <FormControl sx={{ width: 300 }}>
            <TextField
              fullWidth
              type="text"
              placeholder={question.placeholder}
              required={question.mandatory}
              inputProps={{ maxLength: question.maxLength }}
              value={formData[question.id] || ""}
              onChange={handleInputChange(question.id)}
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
            required={question.mandatory}
            value={formData[question.id] || ""}
            onChange={handleInputChange(question.id)}
          />
        );
      case "tel":
        return (
          <TextField
            fullWidth
            type="tel"
            placeholder={question.placeholder}
            required={question.mandatory}
            value={formData[question.id] || ""}
            onChange={handleInputChange(question.id)}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Form Data: ", formData);
    navigate("/auswertung", { state: { formData } });
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
          <MdInsights size={30} /> Zur Auswertung
        </Button>
      </Form>
    </div>
  );
};

export default Fragebogen;
