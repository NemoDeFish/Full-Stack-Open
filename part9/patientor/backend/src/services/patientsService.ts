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
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientID: string, entry: EntryWithoutId): Entry => {
  const id: string = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  patients.find((patient) => patient.id === patientID)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getAllPatients,
  addPatient,
  addEntry,
};
