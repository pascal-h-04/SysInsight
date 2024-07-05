import "../questionnairePageStyle.css";
import { TextField } from "@mui/material";

const TextBoxSelector = ({ question, formData, handleInputChange, errors }) => {
  return (
    <TextField
      fullWidth
      type={question.type}
      placeholder={question.placeholder}
      inputProps={{ maxLength: question.maxLength }}
      value={formData[question.id] || ""}
      onChange={(e) => handleInputChange(question.id, e.target.value)}
      error={errors[question.id]}
    />
  );
};
export default TextBoxSelector;
