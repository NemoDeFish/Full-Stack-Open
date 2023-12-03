import patients from "../../data/patients";
import {
  Patient,
  NewPatient,
  NonSensitivePatient,
  Entry,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // Use (patient) and ...patient instead since both fields are the same
  // But set "ssn: undefined" to not display SSN
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getAllPatients = (): Patient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();

  const newPatient = {
    // Directly assign `id: uuid()` instead of declaring a variable
    id,
    ...patient,
  };

  // Solution did not push, not sure why?
  patients.push(newPatient);
  return newPatient;
};

// const getOne = (id: string): Patient | undefined => {
//   return patients.find((p) => p.id === id);
// };

const addEntry = (patientID: string, entry: EntryWithoutId): Entry => {
  // Directly use uuid() inside newEntry object without declaring a new variable
  const id: string = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  // Solution additionally checks that patient can be found
  // before creating newEntry object and pushing the entries
  // patient.entries = patient.entries.concat(entry)
  patients.find((patient) => patient.id === patientID)?.entries.push(newEntry);
  // Solution returns the entire patient
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getAllPatients,
  addPatient,
  addEntry,
};
