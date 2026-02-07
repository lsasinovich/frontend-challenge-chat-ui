import { UseFormRegisterReturn } from "react-hook-form";

import { twMerge } from "tailwind-merge";

type SearchProps = UseFormRegisterReturn & {
  placeholder?: string;
};

export const Input = ({ placeholder = "Message", ...rest }: SearchProps) => {
  return (
    <input
      data-testid="input"
      type="text"
      placeholder={placeholder}
      className={twMerge(
        "text-primary w-full h-12",
        "bg-white border-2 border-input-border outline-none rounded-md px-sm",
        "placeholder:text-secondary placeholder:pl-1",
      )}
      aria-label="Input message"
      {...rest}
    />
  );
};
