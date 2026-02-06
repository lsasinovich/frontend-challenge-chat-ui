import { twMerge } from "tailwind-merge";

export enum MessageCardType {
  income = "income",
  outcome = "outcome",
}

type Message = {
  value: string;
  date: string;
  author: string;
};

type MessageCardProps = {
  type: MessageCardType;
  message: Message;
};

export function MessageCard({
  type,
  message: { value, author, date },
}: MessageCardProps) {
  const isIncomeCard = type === MessageCardType.income;

  return (
    <div
      className={twMerge(
        "p-md flex flex-col gap-sm w-fit max-w-[70%] border-[2px] border-message-card-border rounded-md text-secondary",
        isIncomeCard
          ? "bg-income-card-background justify-start"
          : "bg-outcome-card-background justify-end self-end",
      )}
    >
      {isIncomeCard && <span>{author}</span>}
      <span className="text-primary">{value}</span>
      <span className={!isIncomeCard ? "text-right" : ""}>{date}</span>
    </div>
  );
}
