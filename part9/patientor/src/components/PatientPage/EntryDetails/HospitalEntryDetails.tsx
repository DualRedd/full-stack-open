import { Box, Typography } from "@mui/material";
import { HospitalEntry } from "../../../types";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return (
    <Box>
      <Typography variant="body1">Discharge date: {entry.discharge.date}</Typography>
      <Typography variant="body1">Discharge criteria: {entry.discharge.criteria}</Typography>
    </Box>
  );
};

export default HospitalEntryDetails;
