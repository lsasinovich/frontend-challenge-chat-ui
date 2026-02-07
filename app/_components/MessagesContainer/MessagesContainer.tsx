"use client";

import { useEffect, useRef, useState } from "react";

import { getMessages } from "@/app/_hooks/getMessages";
import { MessageItem, useMessagesContext } from "@/app/context/MessagesContext";
import { useUserContext } from "@/app/context/UserContext";

import {
  MessageCard,
  MessageCardType,
} from "./_components/MessageCard/MessageCard";

export const MessagesContainer = () => {
  const { messages, setMessages, error, setError } = useMessagesContext();
  const { author } = useUserContext();

  const [hasMore, setHasMore] = useState(true);
  const [lastMessage, setLastMessage] = useState<MessageItem | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" }),
      ),
    );
  };

  useEffect(() => {
    const newLastMessage =
      messages.findLast((m) => !m.hasNotBeenSendYet) ?? null;

    // Scroll to bottom if new message is added
    if (newLastMessage && newLastMessage._id !== lastMessage?._id) {
      setLastMessage(newLastMessage);
      scrollToBottom();
    }
  }, [messages]);

  // Scroll to bottom if error occurs, because I want to show the user that something went wrong
  useEffect(() => {
    if (error) {
      scrollToBottom();
    }
  }, [error]);

  const fetchMessages = async (
    shouldHandleError?: boolean,
    createdAt?: string,
  ) => {
    return getMessages(createdAt)
      .then((allMessages) => {
        setHasMore(!(allMessages.length <= 50));

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
      () => void fetchMessages(false, lastMessage?.createdAt),
      3000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadMore = () => {
    const oldestDate = messages[0].createdAt;

    getMessages("", oldestDate)
      .then((oldMessages) => {
        setHasMore(!!oldMessages.length);

        if (oldMessages.length) {
          setMessages(oldMessages, true);
        }

        setError("");
      })
      .catch(() => setError("Error fetching older messages."));
  };

  return (
    <div className="overflow-y-scroll flex flex-col mx-auto max-w-[640px] gap-md px-lg pt-md pb-[64px]">
      {hasMore && !!messages.length && (
        <button
          onClick={loadMore}
          className="cursor-pointer mx-auto text-primary p-md w-fit border-[2px] rounded-md bg-white border-message-card-border"
        >
          Load more messages
        </button>
      )}

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
        <span className="text-error p-md bg-white rounded-md border-[2px] border-error-border">
          {error}
        </span>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
