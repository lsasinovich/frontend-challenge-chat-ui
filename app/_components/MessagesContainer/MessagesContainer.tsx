"use client";

import { useEffect, useRef } from "react";

import { getMessages } from "@/app/_hooks/getMessages";
import { MessageItem, useMessagesContext } from "@/app/context/MessagesContext";
import { useUserContext } from "@/app/context/UserContext";

import {
  MessageCard,
  MessageCardType,
} from "./_components/MessageCard/MessageCard";

export function MessagesContainer() {
  const { messages, setMessages, error, setError } = useMessagesContext();
  const { author } = useUserContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const lastMessageRef = useRef<MessageItem | null>(null);

  useEffect(() => {
    lastMessageRef.current =
      messages.findLast((m) => !m.hasNotBeenSendYet) ?? null;

    scrollToBottom();
  }, [messages, error]);

  const fetchMessages = async (
    shouldHandleError?: boolean,
    createdAt?: string,
  ) => {
    getMessages(createdAt)
      .then((allMessages) => {
        if (allMessages.length !== 0) {
          setMessages(allMessages);
        }

        setError("");
      })
      .catch(() => {
        if (shouldHandleError) {
          setError("Error fetching messages. Please try again later.");
        } else {
          setError("Your connection is lost.");
        }
      });
  };

  useEffect(() => {
    void fetchMessages(true);

    const intervalId = setInterval(
      () => void fetchMessages(false, lastMessageRef.current?.createdAt),
      3000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="overflow-y-auto flex gap-md flex-col justify-end max-w-content mx-auto px-lg pt-md pb-[80px] min-h-screen">
      {messages.map((item, index) => (
        <MessageCard
          key={`${item.author}-${index}`}
          message={item}
          type={
            item.author !== author
              ? MessageCardType.income
              : MessageCardType.outcome
          }
        />
      ))}

      {error && (
        <span className="text-[#f78166] p-md bg-white rounded-md border-[2px] border-error-border">
          {error}
        </span>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
