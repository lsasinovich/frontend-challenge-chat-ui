import { z } from "zod";

export const messageSchema = z.object({
  message: z.string(),
  author: z.string(),
  createdAt: z.string(),
  _id: z.string(),
});

export const messagesSchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;
