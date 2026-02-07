"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { postMessage } from "@/app/_hooks/postMessage";
import { useMessagesContext } from "@/app/context/MessagesContext";
import { useUserContext } from "@/app/context/UserContext";

import { Input } from "./_components/Input/Input";
import { Button } from "./_components/Button/Button";

type FormData = {
  message: string;
};

export const InputBlock = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const { addMessage, updateMessage } = useMessagesContext();
  const { author } = useUserContext();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data.message.trim()) {
      return;
    }

    const newMessage = { message: data.message, author: author };

    const createdAt = new Date().toString();
    const temporaryId = crypto.randomUUID();

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
      className="p-sm fixed bottom-0 w-full bg-input-container-background"
    >
      <div className="max-w-160 mx-auto sm:px-lg flex-row flex gap-sm">
        <Input {...register("message")} />
        <Button />
      </div>
    </form>
  );
};
