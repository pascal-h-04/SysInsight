import "../questionnairePageStyle.css";
import { Checkbox, FormControlLabel, FormControl } from "@mui/material";

const CheckBoxSelector = ({ question, formData, handleInputChange, errors }) => {
  return (
    <FormControl fullWidth error={errors[question.id]}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!formData[question.id]}
            onChange={(event) =>
              handleInputChange(question.id, event.target.checked)
            }
          />
        }
        label={question.label}
      />
      {errors[question.id] && <div className="error-text">Bitte auswählen</div>}
    </FormControl>
  );
};
export default CheckBoxSelector;
