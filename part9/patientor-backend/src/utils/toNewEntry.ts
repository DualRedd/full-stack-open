import { z } from "zod";
import { EntryType, HealthCheckRating, NewEntry } from "../types/entry";

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.enum(HealthCheckRating),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

const newEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object) as NewEntry;
};

export default toNewEntry;
