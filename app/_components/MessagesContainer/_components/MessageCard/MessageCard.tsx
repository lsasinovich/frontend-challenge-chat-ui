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

export function MessageCard({
  type,
  message: { message, createdAt, author, hasNotBeenSendYet = false, error },
}: MessageCardProps) {
  const isIncomeCard = type === MessageCardType.income;

  return (
    <div
      className={twMerge(
        "min-w-[190px] p-md flex flex-col gap-sm w-fit max-w-[70%] border-[2px] border-message-card-border rounded-md text-secondary",
        isIncomeCard
          ? "bg-income-card-background justify-start"
          : "bg-outcome-card-background justify-end self-end",
      )}
    >
      {isIncomeCard && <span>{author}</span>}

      <div className="flex text-primary">
        <div className="max-w-full break-all">{message}</div>
      </div>

      {error && <span className="text-error">{error}</span>}

      {!hasNotBeenSendYet && (
        <span className={!isIncomeCard ? "text-right" : ""}>
          {formatDate(new Date(createdAt))}
        </span>
      )}
    </div>
  );
}
