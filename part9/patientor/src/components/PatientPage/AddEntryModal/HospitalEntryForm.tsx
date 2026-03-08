import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import { Diagnosis, EntryType, NewEntry } from "../../../types";

interface HospitalEntryFormProps {
  diagnoses: Diagnosis[];
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const HospitalEntryForm = ({
  diagnoses,
  onSubmit,
  onCancel,
}: HospitalEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      type: EntryType.Hospital,
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
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
      <TextField
        fullWidth
        required
        label="Discharge date"
        type="date"
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        required
        label="Discharge criteria"
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
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

export default HospitalEntryForm;
