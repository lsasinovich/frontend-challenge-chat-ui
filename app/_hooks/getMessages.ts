import { fetchWrapper } from "@/app/api/fetchWrapper";
import { messagesSchema } from "@/app/api/schemas/messages";

export function getMessages(after?: string) {
  return fetchWrapper(
    `/api/v1/messages?${after ? `after=${after}` : `before=${new Date().toISOString()}`}`,
    messagesSchema,
  );
}
