import { Entry } from "./entry";

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
