import { useState } from "react";
import axios from "axios";
import { Diagnosis, NewEntry } from "../../../types";
import { apiBaseUrl } from "../../../constants";

import { Box, Modal, Tab, Tabs, Typography } from "@mui/material";

import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface AddEntryModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  diagnoses: Diagnosis[];
  onEntryAdded: (entry: NewEntry) => void;
}

const AddEntryModal = ({
  open,
  onClose,
  patientId,
  diagnoses,
  onEntryAdded,
}: AddEntryModalProps) => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setTab(0);
    setError(null);
    onClose();
  };

  const handleSubmit = async (entry: NewEntry) => {
    setError(null);
    try {
      const { data } = await axios.post<NewEntry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
      onEntryAdded(data);
      handleClose();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data) {
        setError(String(e.response.data.error ?? e.response.data));
      } else {
        setError("Failed to add entry");
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 500 },
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add new entry
        </Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tab label="Health check" id="entry-tab-0" />
          <Tab label="Hospital" id="entry-tab-1" />
          <Tab label="Occupational healthcare" id="entry-tab-2" />
        </Tabs>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {tab === 0 && (
          <HealthCheckEntryForm 
            diagnoses={diagnoses}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
        {tab === 1 && (
          <HospitalEntryForm
            diagnoses={diagnoses}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
        {tab === 2 && (
          <OccupationalHealthcareEntryForm
            diagnoses={diagnoses}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AddEntryModal;
