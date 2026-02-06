"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { Search } from "./_components/Search/Search";
import { Button } from "./_components/Button/Button";

type SearchBlockProps = {};

type FormData = {
  message: string;
};

export function SearchBlock({}: SearchBlockProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-xs fixed bottom-0 w-full bg-input-container-background flex gap-xs"
    >
      <Search {...register("message")} />
      <Button />
    </form>
  );
}
