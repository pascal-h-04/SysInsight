import "../QuestionnairePageStyle.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const SwitchSelector = ({ question, formData, handleInputChange }) => {
  return (
    <ToggleButtonGroup
      value={formData[question.id] || ""}
      exclusive
      onChange={(e, value) => handleInputChange(question.id, value)}
      aria-label="yes-no-toggle"
    >
      <ToggleButton className="yes-no-togglebtn" value="Ja" aria-label="yes">
        Ja
      </ToggleButton>
      <ToggleButton className="yes-no-togglebtn" value="Nein" aria-label="no">
        Nein
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default SwitchSelector;
