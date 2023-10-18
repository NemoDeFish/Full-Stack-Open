import { useState, SyntheticEvent } from "react";
import { Diagnosis } from "../../types";

import {
  TextField,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

import { EntryWithoutId } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: (show: boolean) => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [formType, setFormType] = useState("HealthCheck");
  const [startDate, setStartDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [endDate, setEndDate] = useState("");

  const diagnosesOptions = diagnoses.map((d) => ({
    value: d.code,
    label: d.code.toString(),
  }));

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formType === "HealthCheck") {
      onSubmit({
        description,
        date,
        specialist,
        healthCheckRating: Number(rating),
        diagnosisCodes,
        type: formType,
      });
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating(null);
      setDiagnosisCodes([]);
    } else if (formType === "Hospital") {
      onSubmit({
        description,
        date,
        specialist,
        discharge: { date: startDate, criteria },
        diagnosisCodes,
        type: formType,
      });
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating(null);
      setDiagnosisCodes([]);
      setStartDate("");
      setCriteria("");
    } else if (formType === "OccupationalHealthcare") {
      onSubmit({
        description,
        date,
        specialist,
        employerName,
        sickLeave: { startDate, endDate },
        diagnosisCodes,
        type: formType,
      });
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating(null);
      setDiagnosisCodes([]);
      setStartDate("");
      setCriteria("");
    }
  };

  const onFormTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setFormType(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          my: 1,
          p: 1,
          border: "2px dotted black",
        }}
      >
        {formType === "HealthCheck" && <h4>New HealthCheck entry</h4>}
        {formType === "Hospital" && <h4>New Hospital entry</h4>}
        {formType === "OccupationalHealthcare" && (
          <h4>New OccupationalHealthcare entry</h4>
        )}

        <form onSubmit={addEntry}>
          <InputLabel style={{ marginTop: 20 }}>Form Type</InputLabel>
          <Select
            label="FormType"
            fullWidth
            value={formType}
            onChange={onFormTypeChange}
          >
            <MenuItem key={"HealthCheck"} value={"HealthCheck"}>
              HealthCheck
            </MenuItem>
            <MenuItem key={"Hospital"} value={"Hospital"}>
              Hospital
            </MenuItem>
            <MenuItem
              key={"OccupationalHealthcare"}
              value={"OccupationalHealthcare"}
            >
              OccupationalHealthcare
            </MenuItem>
          </Select>

          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            sx={{ mt: 2 }}
            type="date"
            label="Date"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            variant="standard"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          {formType === "HealthCheck" && (
            <FormControl sx={{ mt: 2, mb: -2 }}>
              <FormLabel>Healthcheck rating</FormLabel>
              <RadioGroup
                row
                sx={{ ml: 0.2 }}
                value={rating}
                onChange={({ target }) => setRating(Number(target.value))}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Healthy"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Low Risk"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="High Risk"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Critical Risk"
                />
              </RadioGroup>
            </FormControl>
          )}
          {formType === "Hospital" && (
            <>
              <InputLabel sx={{ mt: 2 }}>Discharge</InputLabel>
              <FormControl fullWidth>
                <InputLabel sx={{ mt: -1 }}>start</InputLabel>
                <TextField
                  sx={{ mt: 4, mx: 1.5 }}
                  variant="standard"
                  type="date"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  sx={{ mx: 1.5 }}
                  label="Criteria"
                  variant="standard"
                  value={criteria}
                  onChange={({ target }) => setCriteria(target.value)}
                />
              </FormControl>
            </>
          )}
          {formType === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer Name"
                variant="standard"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <InputLabel sx={{ mt: 2 }}>Sickleave</InputLabel>
              <FormControl fullWidth>
                <InputLabel sx={{ mt: -1 }}>start</InputLabel>
                <TextField
                  sx={{ mt: 4, mx: 1.5 }}
                  variant="standard"
                  type="date"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ mt: -1 }}>end</InputLabel>
                <TextField
                  sx={{ mt: 4, mx: 1.5 }}
                  type="date"
                  variant="standard"
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                />
              </FormControl>
            </>
          )}
          <InputLabel sx={{ mt: 2 }}>Diagnosis codes</InputLabel>
          <Select
            multiple
            fullWidth
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Multiple Select" />}
          >
            {diagnosesOptions.map((diagnosis) => (
              <MenuItem key={diagnosis.label} value={diagnosis.value}>
                {diagnosis.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            color="error"
            variant="contained"
            style={{ justifyContent: "flex-start" }}
            sx={{ mt: 2 }}
            type="button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ float: "right" }}
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEntryForm;
