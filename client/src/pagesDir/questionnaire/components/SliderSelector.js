import "../Fragebogen.css";
import { Tooltip, Slider } from "@mui/material";

const Schieberegler = ({ question, formData, handleInputChange }) => {
  const tooltipContent = question.info && (
    <div style={{ fontSize: "16px" }}>
      {question.info.split(",").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
  return (
    <Tooltip title={tooltipContent} placement="right" arrow>
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
        onChange={(event, newValue) => handleInputChange(question.id, newValue)}
      />
    </Tooltip>
  );
};
export default Schieberegler;
