import { fetchWrapper } from "@/app/api/fetchWrapper";
import { messageSchema } from "@/app/api/schemas/messages";

type PostMessage = {
  message: string;
  author: string;
};

export const postMessage = (message: PostMessage) => {
  return fetchWrapper("/api/v1/messages", messageSchema, {
    method: "POST",
    body: JSON.stringify(message),
  });
};
