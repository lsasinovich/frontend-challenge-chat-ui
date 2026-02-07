import { fetchWrapper } from "@/app/api/fetchWrapper";
import { messagesSchema } from "@/app/api/schemas/messages";

export const getMessages = (after?: string, before?: string) => {
  return fetchWrapper(
    `/api/v1/messages?${after ? `after=${after}` : `before=${before || new Date().toISOString()}`}`,
    messagesSchema,
  );
};
