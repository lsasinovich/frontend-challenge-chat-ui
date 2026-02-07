import { twMerge } from "tailwind-merge";

type ButtonProps = {
  buttonText?: string;
};

export const Button = ({ buttonText = "Send" }: ButtonProps) => {
  return (
    <button
      data-testid="send-button"
      type="submit"
      className={twMerge(
        "py-sm px-lg bg-button-background text-white rounded-md cursor-pointer font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-focus-ring",
      )}
      aria-label="Send message"
    >
      {buttonText}
    </button>
  );
};
