import { UseFormRegisterReturn } from "react-hook-form";

import { twMerge } from "tailwind-merge";

type SearchProps = UseFormRegisterReturn & {
  placeholder?: string;
};

export function Search({ placeholder = "Message", ...rest }: SearchProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={twMerge(
        "text-primary w-full h-[48px]",
        "bg-white border-[2px] border-input-border outline-none rounded-md px-xs font-medium",
        "placeholder:text-secondary placeholder:pl-[4px]",
      )}
      aria-label="Input message"
      {...rest}
    />
  );
}
