import { Entry } from "../../../types";
import { assertNever } from "assert-never";

import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;