import { useState } from "react";
import { Diagnosis, EntryType, HealthCheckRating, NewEntry } from "../../../types";

import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

interface HealthCheckEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const HealthCheckEntryForm = ({
  diagnoses,
  onSubmit,
  onCancel,
}: HealthCheckEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      type: EntryType.HealthCheck,
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
      healthCheckRating,
    });
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
      <FormControl fullWidth required>
        <InputLabel>Health check rating</InputLabel>
        <Select
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating) }
          label="Health check rating"
        >
          {healthCheckRatingOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default HealthCheckEntryForm;
