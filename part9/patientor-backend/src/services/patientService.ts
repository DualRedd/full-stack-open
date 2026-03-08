import { v4 as uuid } from 'uuid';
import { Patient, PatientNonSensitive, NewPatient } from '../types';
import patients from '../data/patients';

const toSensitive = (patient: Patient): PatientNonSensitive => {
  const { ssn, ...patientWithoutSSN } = patient;
  return patientWithoutSSN;
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsSensitive = (): PatientNonSensitive[] => {
  return patients.map(toSensitive);
};

const addPatient = (patient: NewPatient): PatientNonSensitive => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return toSensitive(newPatient);
};

export default {
  getPatients,
  getPatientsSensitive,
  addPatient,
};