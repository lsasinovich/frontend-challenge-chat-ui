"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { Message } from "../api/schemas/messages";

export type MessageItem = Message & {
  hasNotBeenSendYet?: boolean;
  error?: string;
};

type MessagesContextType = {
  messages: MessageItem[];
  setMessages: (messages: MessageItem[]) => void;
  addMessage: (message: MessageItem) => void;
  error?: string;
  setError: (isError: string) => void;
  updateMessage: (id: string, newMessage: Partial<MessageItem>) => void;
};

export const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  setMessages: () => {},
  error: "",
  setError: () => {},
  addMessage: () => {},
  updateMessage: () => {},
});

const mergeUniqueOrdered = (err1: MessageItem[], err2: MessageItem[]) => {
  const result = new Set();

  return [...err1, ...err2].filter((item) => {
    if (result.has(item._id)) {
      return false;
    }

    result.add(item._id);

    return true;
  });
};

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages: (newMessages) => {
          setMessages((prevState) =>
            mergeUniqueOrdered(prevState, newMessages),
          );
        },
        error,
        setError,
        addMessage: (message) => setMessages([...messages, message]),
        updateMessage: (id, newMessage) =>
          setMessages((prev) =>
            prev.map((msg) => {
              return msg._id === id ? { ...msg, ...newMessage } : msg;
            }),
          ),
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export function useMessagesContext() {
  const context = useContext(MessagesContext);

  if (!context)
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider",
    );

  return context;
}
