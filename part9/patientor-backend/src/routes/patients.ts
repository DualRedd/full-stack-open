import express from 'express';
import { Response } from 'express';

import patientService from '../services/patientService';
import { PatientNonSensitive } from '../types';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getPatientsSensitive());
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

export default router;