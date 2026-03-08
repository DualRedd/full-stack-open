import express from 'express';
import { Response } from 'express';

import patientService from '../services/patientService';
import { PatientNonSensitive, Patient } from '../types';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';
import { Entry } from '../types/entry';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getPatientsSensitive());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res: Response<PatientNonSensitive | { error: string }>) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res: Response<Entry | { error: string }>) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;