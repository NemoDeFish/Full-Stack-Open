import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const hideWhenVisible = { display: formVisible ? "none" : "" };
  const showWhenVisible = { display: formVisible ? "" : "none" };

  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((response) => {
        setPatient(response as Patient);
      });
    }
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id && patient) {
        const entry = await patientService.addEntry(id, values);
        patient.entries.push(entry);
        setFormVisible(false);
      }
    } catch (e: unknown) {
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

  if (patient) {
    return (
      <div>
        <h2>
          {patient.name} {patient.gender === "male" && <MaleIcon />}
          {patient.gender === "female" && <FemaleIcon />}
        </h2>

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
          <div key={entry.id}>
            <Box
              sx={{
                my: 1,
                p: 1,
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <EntryDetails key={entry.id} entry={entry} />
              {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
                <ul>
                  {entry.diagnosisCodes?.map((code) => {
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
