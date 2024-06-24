import "../Fragebogen.css";
import { FormControl, Select, MenuItem } from "@mui/material";

const Einzelauswahl = ({ question, formData, handleInputChange, errors }) => {
  return (
    <FormControl fullWidth error={errors[question.id]}>
      <Select
        displayEmpty
        value={formData[question.id] || ""}
        onChange={(e) => handleInputChange(question.id, e.target.value)}
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
};
export default Einzelauswahl;
