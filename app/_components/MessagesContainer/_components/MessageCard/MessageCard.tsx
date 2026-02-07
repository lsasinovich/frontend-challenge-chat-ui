import { twMerge } from "tailwind-merge";
import { MessageItem } from "@/app/context/MessagesContext";
import { formatDate } from "@/app/_components/MessagesContainer/utils";

export enum MessageCardType {
  income = "income",
  outcome = "outcome",
}

type MessageCardProps = {
  type: MessageCardType;
  message: MessageItem;
};

export const MessageCard = ({
  type,
  message: { message, createdAt, author, hasNotBeenSendYet = false, error },
}: MessageCardProps) => {
  const isIncomeCard = type === MessageCardType.income;

  return (
    <div
      className={twMerge(
        "min-w-47.5 flex flex-col gap-sm w-fit max-w-[70%] border-2 border-message-card-border rounded-md text-secondary",
        isIncomeCard
          ? "bg-income-card-background justify-start p-md"
          : "bg-outcome-card-background justify-end self-end pb-sm",
      )}
    >
      {isIncomeCard && <span>{author}</span>}

      <div className={twMerge("flex flex-col", !isIncomeCard && "pt-md px-md")}>
        <div className="max-w-full text-primary break-all">{message}</div>

        {error && <span className="text-error">{error}</span>}
      </div>

      {!hasNotBeenSendYet && (
        <span className={!isIncomeCard ? "text-right pr-sm" : ""}>
          {formatDate(new Date(createdAt))}
        </span>
      )}
    </div>
  );
};
