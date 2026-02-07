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

  const [isFirstRender, setIsFirstRender] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const lastMessageRef = useRef<MessageItem | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // !!! I faced with the error in initial page load bottom scrolling,
  // I didn't have enough time to understand the issue, so left initial page without bottom scrolling
  const scrollToBottom = () => {
    if (!isFirstRender) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isFirstRender && messages.length) {
      setIsFirstRender(false);
    }
  }, [isFirstRender, messages.length]);

  useEffect(() => {
    const newLastMessage =
      messages.findLast((m) => !m.hasNotBeenSendYet) ?? null;

    if (newLastMessage && newLastMessage._id !== lastMessageRef.current?._id) {
      lastMessageRef.current = newLastMessage;

      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      scrollToBottom();
    }
  }, [error]);

  const fetchMessages = async (
    isLongPollingError?: boolean,
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
        if (isLongPollingError) {
          setError("Your connection is lost.");
        } else {
          setError("Error fetching messages.");
        }
      });
  };

  useEffect(() => {
    void fetchMessages();

    const intervalId = setInterval(
      () => void fetchMessages(true, lastMessageRef.current?.createdAt),
      3000,
    );

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="overflow-y-scroll flex flex-col mx-auto max-w-160 gap-md px-lg pt-md pb-16">
      {hasMore && !!messages.length && (
        <button
          onClick={loadMore}
          className="cursor-pointer mx-auto text-primary p-md w-fit border-2 rounded-md bg-white border-message-card-border"
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
        <span className="text-error p-md bg-white rounded-md border-2 border-error-border">
          {error}
        </span>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
