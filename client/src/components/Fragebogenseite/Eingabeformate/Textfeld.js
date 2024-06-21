import "../Fragebogen.css";
import { TextField } from "@mui/material";

const Textfeld = ({ question, formData, handleInputChange, errors }) => {
  return (
    <TextField
      fullWidth
      type={question.type}
      placeholder={question.placeholder}
      inputProps={{ maxLength: question.maxLength }}
      value={formData[question.id] || ""}
      onChange={handleInputChange(question.id)}
      error={errors[question.id]}
    />
  );
};
export default Textfeld;
