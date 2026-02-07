import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import type { MessageItem } from "@/app/context/MessagesContext";
import { MessageCard, MessageCardType } from "./MessageCard";

vi.mock("@/app/_components/MessagesContainer/utils", () => ({
  formatDate: vi.fn(() => "FORMATTED_DATE"),
}));

const baseMessage: MessageItem = {
  _id: "1",
  message: "Hello world",
  createdAt: new Date("2024-01-01T12:00:00Z").toISOString(),
  author: "Alice",
};

describe("MessageCard", () => {
  afterEach(() => {
    cleanup();

    document.body.innerHTML = "";
  });

  test("renders income message with author, message and formatted date", () => {
    render(<MessageCard type={MessageCardType.income} message={baseMessage} />);

    expect(screen.findByText("Alice")).toBeTruthy();
    expect(screen.findByText("Hello world")).toBeTruthy();
    expect(screen.findByText("FORMATTED_DATE")).toBeTruthy();
  });

  test("renders outcome message without author and hides date when hasNotBeenSendYet", () => {
    render(
      <MessageCard
        type={MessageCardType.outcome}
        message={{ ...baseMessage, hasNotBeenSendYet: true }}
      />,
    );

    expect(screen.queryAllByText("Alice")).toHaveLength(0);
    expect(screen.findByText("Hello world")).toBeTruthy();
    expect(screen.queryAllByText("FORMATTED_DATE")).toHaveLength(0);
  });

  test("renders error text when error present", () => {
    const message: MessageItem = { ...baseMessage, error: "Network error" };

    render(<MessageCard type={MessageCardType.income} message={message} />);

    expect(screen.findByText("Network error")).toBeTruthy();
  });
});
