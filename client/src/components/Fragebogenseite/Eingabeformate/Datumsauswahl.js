import "../Fragebogen.css";
// npm install @mui/x-date-pickers @mui/material @emotion/react @emotion/styled dayjs !
import {
  AdapterDayjs,
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/de";
import { TextField } from "@mui/material";

const Datumsauswahl = ({ question, formData, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={question.label}
        value={formData[question.id] || null}
        onChange={handleDateChange(question.id)}
        minDate={dayjs().add(1, "day")}
        format="DD.MM.YYYY"
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};
export default Datumsauswahl;
