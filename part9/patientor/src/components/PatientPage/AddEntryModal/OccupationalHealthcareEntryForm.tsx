import { useState } from "react";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";

import { Diagnosis, EntryType, NewEntry } from "../../../types";

interface OccupationalHealthcareEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const OccupationalHealthcareEntryForm = ({
  diagnoses,
  onSubmit,
  onCancel,
}: OccupationalHealthcareEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveEnabled, setSickLeaveEnabled] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entry: NewEntry = {
      type: EntryType.OccupationalHealthcare,
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
      employerName,
      ...(sickLeaveEnabled &&
        sickLeaveStart &&
        sickLeaveEnd && {
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        }),
    };
    onSubmit(entry);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        required
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        fullWidth
        required
        label="Date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: new Date().toISOString().slice(0, 10) }}
      />
      <TextField
        fullWidth
        required
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
          label="Diagnosis codes"
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} – {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        required
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={sickLeaveEnabled}
            onChange={({ target }) => setSickLeaveEnabled(target.checked)}
          />
        }
        label="Sick leave"
      />
      {sickLeaveEnabled && (
        <>
          <TextField
            fullWidth
            required={sickLeaveEnabled}
            label="Sick leave start date"
            type="date"
            value={sickLeaveStart}
            onChange={({ target }) => {
              setSickLeaveStart(target.value);
              if (sickLeaveEnd < target.value) {
                setSickLeaveEnd(target.value);
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            required={sickLeaveEnabled}
            label="Sick leave end date"
            type="date"
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: sickLeaveStart || undefined }}
          />
        </>
      )}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default OccupationalHealthcareEntryForm;
