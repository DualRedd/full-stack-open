import { z } from "zod";
import { NewPatient, Gender } from "../types";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export default toNewPatient;