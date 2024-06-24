import "../Fragebogen.css";
import { Radio, RadioGroup, Grid, FormControlLabel } from "@mui/material";

const Knopfgruppe = ({ question, formData, handleInputChange, errors }) => {
  return (
    <div className="category-btns">
      <RadioGroup
        row
        aria-label={question.id}
        name={question.id}
        value={formData[question.id] || ""}
        onChange={(e) => handleInputChange(question.id, e.target.value)}
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
      {errors[question.id] && (
        <div className="error-text">Bitte wählen Sie eine Option.</div>
      )}
    </div>
  );
};
export default Knopfgruppe;
