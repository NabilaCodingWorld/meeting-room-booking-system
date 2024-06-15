import { z } from "zod";

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string().regex(/^[0-9a-fA-F]{24}$/),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  }),
});

export const SlotValidation = {
  createSlotValidationSchema,
};
