import "../Fragebogen.css";
import { Checkbox, FormControlLabel } from "@mui/material";

const Ankreuzbox = ({ question, formData, setFormData }) => {
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
};
export default Ankreuzbox;
