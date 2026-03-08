import { Box, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: OccupationalHealthcareEntryDetailsProps) => {
  return (
    <Box>
      <Typography variant="body1">Employer name: {entry.employerName}</Typography>
      { entry.sickLeave && (
        <>
          <Typography variant="body1">Sick leave start date: {entry.sickLeave.startDate}</Typography>
          <Typography variant="body1">Sick leave end date: {entry.sickLeave.endDate}</Typography>
        </>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
