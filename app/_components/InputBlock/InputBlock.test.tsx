import React from "react";
import { render, screen } from "@testing-library/react";

import { MessagesProvider } from "@/app/context/MessagesContext";
import { UserContext } from "@/app/context/UserContext";
import { InputBlock } from "./InputBlock";

vi.mock("@/app/_hooks/postMessage", () => ({
  postMessage: vi.fn(),
}));

describe("InputBlock", () => {
  afterEach(() => {});
  test("renders input and send button", () => {
    render(
      <MessagesProvider>
        <UserContext.Provider value={{ author: "Tester" }}>
          <InputBlock />
        </UserContext.Provider>
      </MessagesProvider>,
    );

    const input = screen.queryByTestId("input");
    const btn = screen.queryByTestId("send-button");

    expect(input).not.toBeNull();
    expect(btn).not.toBeNull();
  });
});
