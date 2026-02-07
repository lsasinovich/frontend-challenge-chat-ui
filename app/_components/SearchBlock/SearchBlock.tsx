"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { postMessage } from "@/app/_hooks/postMessage";
import { useMessagesContext } from "@/app/context/MessagesContext";
import { useUserContext } from "@/app/context/UserContext";

import { Search } from "./_components/Search/Search";
import { Button } from "./_components/Button/Button";

type FormData = {
  message: string;
};

export const SearchBlock = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const { addMessage, updateMessage } = useMessagesContext();
  const { author } = useUserContext();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newMessage = { message: data.message, author: author };

    const createdAt = new Date().toString();
    const temporaryId = Math.random().toString(36).substring(7);

    addMessage({
      ...newMessage,
      _id: temporaryId,
      hasNotBeenSendYet: true,
      createdAt,
    });

    setValue("message", "");

    postMessage(newMessage)
      .then((savedMessage) => {
        updateMessage(temporaryId, {
          ...savedMessage,
          hasNotBeenSendYet: false,
        });
      })
      .catch(() => {
        updateMessage(temporaryId, {
          error: "Error sending message. Please try again later.",
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-sm fixed bottom-0 w-full bg-input-container-background flex gap-sm"
    >
      <Search {...register("message")} />
      <Button />
    </form>
  );
};
