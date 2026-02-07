import { z } from "zod";

export const errorSchema = z.object({
  message: z.string(),
  statusCode: z.number().optional(),
  error: z.string().optional(),
});
