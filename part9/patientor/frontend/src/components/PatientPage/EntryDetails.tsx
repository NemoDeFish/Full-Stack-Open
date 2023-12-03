import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import {
  Work as WorkIcon,
  LocalHospital as LocalHospitalIcon,
  Favorite as FavoriteIcon,
  LocalPharmacy as LocalPharmacyIcon,
} from "@mui/icons-material";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <div>
      {entry.date} <LocalPharmacyIcon />
      <br />
      <em>{entry.description}</em>
      <br />
      {/* Declare an enumeration, which maps the healthCheckRating
          to the color and only requires 1 <FavoriteIcon /> */}
      {/* <div style={{ color: colors[entry.healthCheckRating] }}>
            <Favorite />
          </div> */}
      {entry.healthCheckRating === 0 && <FavoriteIcon color="success" />}
      {entry.healthCheckRating === 1 && (
        <FavoriteIcon style={{ color: "yellow" }} />
      )}
      {entry.healthCheckRating === 2 && <FavoriteIcon color="secondary" />}
      {entry.healthCheckRating === 3 && <FavoriteIcon color="error" />}
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <div>
      {entry.date} <LocalHospitalIcon />
      <br />
      <em>{entry.description}</em>
      <br />
      diagnose by {entry.specialist}
      <br />
      discharged {entry.discharge.date}: {entry.discharge.criteria}
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      {entry.date} <WorkIcon /> <em>{entry.employerName}</em>
      <br />
      <em>{entry.description}</em>
      <br />
      diagnose by {entry.specialist}
      <br />
      {entry.sickLeave && (
        <>
          sick leave started: {entry.sickLeave?.startDate}, ended:{" "}
          {entry.sickLeave?.endDate}{" "}
        </>
      )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// The date, description, and icons are all common,
// so they can be rendered separately for cleaner code
// instead of declaring it repeatedly in the <EntryInfo /> components.

// <EntryInfo /> is for the each entries,
// whereas <EntryDetails /> are for the switch case for different entry types.
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  // The icons can be refactored into its own function 'typeIcon'
  // const typeIcon = (type: string) => {
  //   if (type === "HealthCheck") {
  //     return <MedicalServices />;
  //   }

  //   if (type === "OccupationalHealthcare") {
  //     return <Work />;
  //   }

  //   return <LocalHospital />;
  // };

  // Solution immediately returns instead of refactoring specific entry types
  // One advantage of doing so is that you do not need to pass
  // the entry details to the individual components and declare the type of entry
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
