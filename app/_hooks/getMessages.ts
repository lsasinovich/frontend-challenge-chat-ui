"use client";

import { fetchWrapper } from "@/app/api/fetchWrapper";
import { messagesSchema, type Message } from "@/app/api/schemas/messages";

export const getMessages = (
  after?: string,
  before?: string,
): Promise<Message[]> => {
  return fetchWrapper(
    `/api/v1/messages?${after ? `after=${after}` : `before=${before || new Date().toISOString()}`}`,
    messagesSchema,
  );
};
