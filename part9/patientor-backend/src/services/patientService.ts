import { v4 as uuid } from 'uuid';
import { Patient, PatientNonSensitive, NewPatient } from '../types';
import patients from '../data/patients';
import { Entry, NewEntry } from '../types/entry';

const toSensitive = (patient: Patient): PatientNonSensitive => {
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsSensitive = (): PatientNonSensitive[] => {
  return patients.map(toSensitive);
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): PatientNonSensitive => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  } satisfies Patient;
  patients.push(newPatient);
  return toSensitive(newPatient);
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = getPatient(patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  } satisfies Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsSensitive,
  getPatient,
  addPatient,
  addEntry,
};