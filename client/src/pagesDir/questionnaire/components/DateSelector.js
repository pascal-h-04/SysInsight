import "../QuestionnairePageStyle.css";
// npm install @mui/x-date-pickers @mui/material @emotion/react @emotion/styled dayjs
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { TextField } from "@mui/material";

const DateSelector = ({ question, formData, handleInputChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={question.label}
        value={formData[question.id] || null}
        onChange={(date) => handleInputChange(question.id, date)}
        minDate={dayjs().add(1, "day")}
        format="DD.MM.YYYY"
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};
export default DateSelector;
