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

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
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
