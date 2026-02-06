import {
  MessageCard,
  MessageCardType,
} from "./_components/MessageCard/MessageCard";

type MessagesContainerProps = {};

export function MessagesContainer({}: MessagesContainerProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] gap-md flex-col justify-end max-w-content mx-auto px-lg pt-md pb-[80px] min-h-screen">
      {[
        {
          type: MessageCardType.income,
          message: { value: "Hello world", author: "Me", date: "12:00" },
        },
        {
          type: MessageCardType.outcome,
          message: {
            value:
              "Hello world Hello world Hello world Hello world Hello world Hello world",
            author: "Me",
            date: "12:00",
          },
        },
      ].map((item) => (
        <MessageCard {...item} />
      ))}
    </div>
  );
}
