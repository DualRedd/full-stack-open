import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient, Gender, Diagnosis } from "../../types";
import { apiBaseUrl } from "../../constants";

import { Box, Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import EntryCard from "./EntryCard";
import AddEntryModal from "./AddEntryModal";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [addEntryModalOpen, setAddEntryModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setDiagnoses(data);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const GenderIcon =
    patient.gender === Gender.Male
      ? MaleIcon
      : patient.gender === Gender.Female
        ? FemaleIcon
        : TransgenderIcon;

  return (
    <Box style={{ marginTop: "1.5em" }}>
      <Typography variant="h4">{patient.name} <GenderIcon fontSize="small" /></Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Typography variant="body1">Date of birth: {patient.dateOfBirth}</Typography>
      <Typography variant="h5" style={{ marginTop: "1em" }}>Entries</Typography>
      <Button
        variant="contained"
        onClick={() => setAddEntryModalOpen(true)}
        sx={{ mt: 1 }}
      >
        Add entry
      </Button>
      {patient.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
      <AddEntryModal
        open={addEntryModalOpen}
        onClose={() => setAddEntryModalOpen(false)}
        patientId={patient.id}
        diagnoses={diagnoses}
        onEntryAdded={async () => {
          const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          setPatient(data);
        }}
      />
    </Box>
  );
};

export default PatientPage;