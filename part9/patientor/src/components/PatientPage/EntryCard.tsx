import { Diagnosis, Entry } from "../../types";
import { Box, Typography } from "@mui/material";

import EntryDetails from "./EntryDetails";

interface EntryCardProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryCard = ({ entry, diagnoses }: EntryCardProps) => {
  return (
    <Box style={{ margin: "0.5em 0", border: "1px solid #e0e0e0", borderRadius: "0.5em", padding: "0.5em" }}>
      <Typography variant="body1">
        {entry.date}: {entry.description}
        </Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>{code} {diagnoses.find((d) => d.code === code)?.name || "Unknown"}</li>
            ))}
          </ul>
        )}
        <EntryDetails entry={entry} />
        <Typography variant="body1">
          Specialist: {entry.specialist}
        </Typography>
    </Box>
  );
};

export default EntryCard;