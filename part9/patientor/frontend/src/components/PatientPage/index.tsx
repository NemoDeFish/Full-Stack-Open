import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// These icons can be combined into a single import as shown:
// import { Male, Female, QuestionMark } from'@mui/icons-material';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Box, Button, Alert } from "@mui/material";

import patientService from "../../services/patients";

import { Patient, Diagnosis, EntryWithoutId } from "../../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string>();

  // const getGenderIcon = (gender: Gender) => {
  //   if (gender === Gender.Male) {
  //     return <Male />;
  //   }
  //
  //   if (gender === Gender.Female) {
  //     return <Female />;
  //   }
  //
  //   Solution sets a question mark for gender type 'others'
  //   return <QuestionMark />;
  // };

  // Solution returns strings only, which means that when a diagnosis
  // is not found, it returns "unknown" instead of the default "undefined"
  // const diagnosis = (code: string): string => {
  //   const foundDiagnosis = diagnoses.find((d) => d.code === code);
  //   if (!foundDiagnosis) return "unknown";
  //   return foundDiagnosis.name;
  // };

  // Alternative option is to use an if statement to return either
  // button or form, reducing amount of code written
  const hideWhenVisible = { display: formVisible ? "none" : "" };
  const showWhenVisible = { display: formVisible ? "" : "none" };

  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((response) => {
        // `as Patient` here is not required
        setPatient(response as Patient);
      });
    }
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      // Check for patient first before adding entry by
      // moving if statement outside of try-catch block
      // No patient should return null
      if (id && patient) {
        // You can use patient.id to avoid checking for id
        const entry = await patientService.addEntry(id, values);
        // Solution returns an 'updatedPatient' instead of an entry
        // So we can directly use `setPatient(updatedPatient)`
        patient.entries.push(entry);
        setFormVisible(false);
      }
    } catch (e: unknown) {
      // This error is handled by 'getErrorMessage' function in 'utils.ts'
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.log(message);
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // const style = {
  //   margin: 10,
  //   padding: 10,
  //   borderRadius: 5,
  //   borderStyle: "solid",
  // };

  // Make an if statement for the case when patient is null:
  // `if (!patient) return null;`
  // otherwise, return below
  if (patient) {
    return (
      <div>
        <h2>
          {/* Gender icon can be refactored into function 'getGenderIcon' */}
          {patient.name} {patient.gender === "male" && <MaleIcon />}
          {patient.gender === "female" && <FemaleIcon />}
        </h2>

        {/* Instead of using <p> with <br />, 
            wrap it individiaully using <div></div> */}
        <p>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        <div style={showWhenVisible}>
          <AddEntryForm
            diagnoses={diagnoses}
            onSubmit={submitNewEntry}
            onCancel={setFormVisible}
          />
        </div>
        {patient.entries.length !== 0 && <h3>entries</h3>}
        {patient.entries.map((entry) => (
          // This entire part can be refactored into:
          // <EntryInfo key={e.id} entry={e} diagnoses={diagnoses} />
          <div key={entry.id}>
            {/* Solution uses CSS styles to style instead of <Box /> */}
            <Box
              sx={{
                my: 1,
                p: 1,
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <EntryDetails key={entry.id} entry={entry} />
              {/* The diagnoses can also be passed into <EntryInfo />
                  instead of outputing it here in <PatientPage /> */}
              {/* Solution does not check for this condition,
                  the reason for me checking is to remove the unwanted 
                  <ul></ul> space at the bottom 
                  given there are no diagnosisCodes */}
              {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
                <ul>
                  {entry.diagnosisCodes?.map((code) => {
                    // Solution refactors this into a separate function 'diagnosis'
                    const diagnosis = diagnoses.find(
                      (diagnosis) => code === diagnosis.code
                    );
                    return (
                      <li key={code}>
                        {code} {diagnosis?.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Box>
          </div>
        ))}

        {/* This can be placed inside <AddEntryForm> instead
            by passing the function 'setFormVisible' as 'onOpen',
            the 'visibility' state as 'visible' */}
        <div style={hideWhenVisible}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormVisible(true)}
          >
            add new entry
          </Button>
        </div>
      </div>
    );
  }
};

export default PatientPage;
