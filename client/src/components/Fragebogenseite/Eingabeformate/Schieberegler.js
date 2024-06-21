import "../Fragebogen.css";
import { Tooltip, Slider } from "@mui/material";

const Schieberegler = ({ question, formData, setFormData }) => {
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
};
export default Schieberegler;
