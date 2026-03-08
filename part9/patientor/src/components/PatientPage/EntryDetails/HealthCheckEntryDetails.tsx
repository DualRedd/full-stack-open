import { Box, Typography } from "@mui/material";
import { HealthCheckEntry } from "../../../types";

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryDetailsProps) => {
  return (
    <Box>
      <Typography variant="body1">Health check rating: {entry.healthCheckRating}</Typography>
    </Box>
  );
};

export default HealthCheckEntryDetails;
