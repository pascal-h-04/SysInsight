import "../Fragebogen.css";
import { FormControl, Select, MenuItem, Checkbox } from "@mui/material";

const Mehrfachauswahl = ({ question, formData, handleInputChange, errors }) => {
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
  </FormControl>;
};
export default Mehrfachauswahl;
