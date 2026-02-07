import { UseFormRegisterReturn } from "react-hook-form";

import { twMerge } from "tailwind-merge";

type SearchProps = UseFormRegisterReturn & {
  placeholder?: string;
};

export const Search = ({ placeholder = "Message", ...rest }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={twMerge(
        "text-primary w-full h-[48px]",
        "bg-white border-[2px] border-input-border outline-none rounded-md px-sm",
        "placeholder:text-secondary placeholder:pl-[4px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-focus-ring",
      )}
      aria-label="Input message"
      {...rest}
    />
  );
};
