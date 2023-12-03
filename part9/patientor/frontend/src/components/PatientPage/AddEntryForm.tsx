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
  // Solution did not declare type of 'rating', by default: string
  const [rating, setRating] = useState<number | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // Can be type guarded to limit to three options only using:
  // useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>
  const [formType, setFormType] = useState("HealthCheck");
  const [startDate, setStartDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [endDate, setEndDate] = useState("");

  // const style = {
  //   marginTop: 10,
  //   marginBottom: 20,
  //   padding: 10,
  //   borderStyle: "dashed",
  // };

  // const emptyTheForm = () => {
  //   setDescription("");
  //   setDate("");
  //   setSpecialist("");
  //   setRating("");
  //   setDischargeDate("");
  //   setDischargeCriteria("");
  //   setEmployerName("");
  //   setSickLeaveStart("");
  //   setSickLeaveEnd("");
  //   setDiagnosisCodes([]);
  // };

  // Not required, can directly map it to array only,
  // since we are not directly passing this,
  // but we are destructuring it, which makes this redundant
  // const diagnosisOptions = diagnoses.map((d) => d.code);

  const diagnosesOptions = diagnoses.map((d) => ({
    value: d.code,
    label: d.code.toString(),
  }));

  // Solution returns an array of string instead of typeof diagnosisCodes
  // const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    // There should be `event.preventDefault()`

    // Solution immediately receives it as an array?
    // if ( Array.isArray(event.target.value)) {
    //       const codes = event.target.value as string[];
    //       setDiagnosisCodes(codes);
    //     }
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    // Create an object first for common fields:
    // const common = {
    //   description,
    //   date,
    //   specialist,
    //   diagnosisCodes,
    // };

    if (formType === "HealthCheck") {
      // Add specific fields to common objects
      // const object: EntryFormValues = {
      //   ...common,
      //   type,
      //   healthCheckRating: Number(rating),
      // };

      // By passing the function back to <PatientPage/>,
      // we can clear the form only if the form was submitted successfully
      // because there is a try-catch block there, but the form
      // and setState functions are all here.
      // onSubmit(object, emptyTheForm);
      onSubmit({
        description,
        date,
        specialist,
        healthCheckRating: Number(rating),
        diagnosisCodes,
        type: formType,
      });
      // Can be reset by calling emptyTheForm instead of repetitive code
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating(null);
      setDiagnosisCodes([]);
    } else if (formType === "Hospital") {
      // Here, we should check if discharge is present,
      // because discharge is an optional field
      // so we can still assign discharge field
      // into the entry object, but if it is undefined,
      // the field is considered empty and not added.
      // const discharge =
      //   dischargeDate.length > 0 && dischargeCriteria.length > 0
      //     ? {
      //         date: dischargeDate,
      //         criteria: dischargeCriteria,
      //       }
      //     : undefined;
      // const object: EntryFormValues = {
      //   ...common,
      //   type,
      //   discharge,
      // };
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
      // const sickLeave =
      //   sickLeaveStart.length > 0 && sickLeaveEnd.length > 0
      //     ? {
      //         startDate: sickLeaveStart,
      //         endDate: sickLeaveEnd,
      //       }
      //     : undefined;

      // const object: EntryFormValues = {
      //   ...common,
      //   type,
      //   employerName,
      //   sickLeave,
      // };

      // onSubmit(object, emptyTheForm);
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
  // const typeOptions = ["HealthCheck", "Hospital", "OccupationalHealthcare"];

  const onFormTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    // We have to narrow the type of event.target.value to make sure that
    // A) it is a string
    // B) it is only restricted to the three values
    // if (typeof event.target.value === "string") {
    //   const value = event.target.value;
    //   if (
    //     value === "HealthCheck" ||
    //     value === "Hospital" ||
    //     value === "OccupationalHealthcare"
    //   ) {
    //     setType(value);
    //   }
    // }
    setFormType(event.target.value);
  };

  return (
    <div>
      {/* Can also be done using CSS styles instead of <Box> */}
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
            {/* Can be replaced using map function paired with an array
                instead of hardcoding the values */}
            {/* {typeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))} */}
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
          {/* Solution uses <InputLabel> with <Input>, but
              the reason why I used <TextField> is due to overlapping
              issue, and <TextField> can set 'InputLabelProps' to
              solve the issue, but <Input> cannot */}
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
          {/* Solution used <Select> instead */}
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
              {/* Solution uses <InputLabel> with <Input>, but
              the reason why I used <TextField> is due to overlapping
              issue, and <TextField> can set 'InputLabelProps' to
              solve the issue, but <Input> cannot */}
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
              {/* Solution uses <InputLabel> with <Input>, but
              the reason why I used <TextField> is due to overlapping
              issue, and <TextField> can set 'InputLabelProps' to
              solve the issue, but <Input> cannot */}
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
          {/* Solution used Grid to organize the buttons,
              I find that it was unnecessary */}
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
