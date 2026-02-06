type ButtonProps = {
  buttonText?: string;
};

export function Button({ buttonText = "Send" }: ButtonProps) {
  return (
    <button
      type="submit"
      className="py-xs px-lg bg-button-background text-white rounded-md cursor-pointer font-semibold"
      aria-label="Send message"
    >
      {buttonText}
    </button>
  );
}
