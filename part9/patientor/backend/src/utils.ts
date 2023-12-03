import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  DischargeEntry,
  SickLeaveEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// This is a generic parser for all fields that are strings
// const parseString = (value: unknown, what: string): string => {
//   if (isString(value)) {
//     return value;
//   }
//   throw new Error(`Value of ${what} incorrect: ${value}`);
// };

// Just check for isString since the presence of the field
// is already checked inside the "toNewPatient" function
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Invalid name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid date: " + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Invalid occupation: " + occupation);
  }

  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Invalid ssn: " + ssn);
  }

  return ssn;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // You can separate the checking of each fields are present
  // and only return if no errors are thrown:
  // if (!("name" in object)) throw new Error("name missing");
  // if (!("occupation" in object)) throw new Error("occupation missing");
  // if (!("ssn" in object)) throw new Error("ssn missing");
  // if (!("gender" in object)) throw new Error("gender missing");
  // if (!("dateOfBirth" in object)) throw new Error("dateOfBirth missing");
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    // Instead of making a separate parser for each field,
    // you can use a generic parser "parseString"
    // for all fields that are strings
    // NewPatient below does not need to be specified
    // since it is declared in the function.
    // Thus, return immediately
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // For Exercise 9.20
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Invalid description: " + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Invalid specialist: " + specialist);
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Invalid employer name: " + employerName);
  }

  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

// Solution immediately checks for the value
// as there are only 4 possible values only
// It also does not use the type 'HealthCheckRating'

// const parseHealtCheckRating = (value: unknown, what: string): 0 | 1 | 2 | 3 => {
//   if (
//     isNumber(value) &&
//     (value === 0 || value === 1 || value === 2 || value === 3)
//   ) {
//     return value;
//   }
//   throw new Error(`Value of ${what} incorrect: ${value}`);
// };

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating === null ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Value of healthCheckRating incorrect: " + healthCheckRating
    );
  }

  return healthCheckRating;
};

// Solution defines a 'DischargeType' here,
// because they combined the types in 'types.ts'.
// So there are advantages and disadvantages of using different solutions.
// const parseDischarge = (object: unknown): DischargeType | undefined =>  {
const parseDischarge = (object: unknown): DischargeEntry => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    throw new Error("Invalid discharge: " + object);
  }

  // Solution returns undefined if discharge is not in object
  // because discharge is an optional field.
  //  if (!object || typeof object !== "object" || !("discharge" in object)) {
  //    return undefined;
  //  }

  //  const discharege = object.discharge;

  //  Type narrowing discharge field
  //  if (!discharege || typeof discharege !== "object")
  //    throw new Error("invalid discharge");

  //  Also check for the fields inside the discharge object.
  //  if (
  //    !("date" in discharege) ||
  //    !isString(discharege.date) ||
  //    !isDate(discharege.date)
  //  ) {
  //    throw new Error("discharge date missing or wrong type");
  //  }

  //  if (!("criteria" in discharege) || !isString(discharege.criteria)) {
  //    throw new Error("discharge criteria missing or wrong type");
  //  }

  //  return {
  //    date: discharege.date,
  //    criteria: discharege.criteria,
  //  };

  return object.discharge as DischargeEntry;
};

// const parseSickLeave = (object: unknown): SickLeaveType | undefined => {
//   if (!object || typeof object !== "object" || !("sickLeave" in object)) {
//     return undefined;
//   }

//   const siclLeave = object.sickLeave;

//   if (!siclLeave || typeof siclLeave !== "object")
//     throw new Error("invalid siclLeave");
//   if (
//     !("startDate" in siclLeave) ||
//     !isString(siclLeave.startDate) ||
//     !isDate(siclLeave.startDate)
//   ) {
//     throw new Error("sickLeave startDate missing or wrong type");
//   }
//   if (
//     !("endDate" in siclLeave) ||
//     !isString(siclLeave.endDate) ||
//     !isDate(siclLeave.endDate)
//   ) {
//     throw new Error("sickLeave endDate missing or wrong type");
//   }

//   return {
//     startDate: siclLeave.startDate,
//     endDate: siclLeave.endDate,
//   };
// };

const parseSickLeave = (object: unknown): SickLeaveEntry => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    throw new Error("Invalid sickLeave: " + object);
  }

  return object.sickLeave as SickLeaveEntry;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // Step 1: Check entry's common fields first to eliminate repeated code
  // if (!("type" in object)) throw new Error("type missing");
  // if (!("date" in object)) throw new Error("date missing");
  // if (!("specialist" in object)) throw new Error("specialist missing");
  // if (!("description" in object)) throw new Error("description missing");
  // const common = {
  //   date: parseDate(object.date, "date"),
  //   specialist: parseString(object.specialist, "specialist"),
  //   description: parseString(object.description, "description"),
  //   diagnosisCodes: parseDiagnosisCodes(object),
  // };

  // Step 2: Check for each individual entry
  // if ( object.type === 'HealthCheck') {
  //   if ( !('healthCheckRating' in object)) throw new Error('healthCheckRating missing');
  //   return {
  //     ...common,
  //     type: 'HealthCheck',
  //     healthCheckRating: parseHealtCheckRating(object.healthCheckRating, 'healthCheckRating'),
  //   };
  // We can only check for the required fields,
  // for optional fields, the parsers will return undefined,
  // which immediately removes the field from the resulting entry
  // } else if ( object.type === 'OccupationalHealthcare') {
  //   if ( !('employerName' in object)) throw new Error('employerName missing');
  //   return {
  //     ...common,
  //     type: 'OccupationalHealthcare',
  //     employerName: parseString(object.employerName, 'employerName'),
  //     sickLeave: parseSickLeave(object)
  //   };
  // } else if ( object.type === 'Hospital') {
  //   return {
  //     ...common,
  //     type: 'Hospital',
  //     discharge: parseDischarge(object)
  //   };
  // }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object &&
    "diagnosisCodes" in object
  ) {
    const newEntry: EntryWithoutId = {
      // Instead of making separate parsers for each field,
      // use a generic parseString and parseDate
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };

    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "discharge" in object
  ) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: "Hospital",
      discharge: parseDischarge(object),
    };

    return newEntry;
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "employerName" in object &&
    "sickLeave" in object
  ) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: "OccupationalHealthcare",
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
