import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  test("renders default button text and aria-label", () => {
    render(<Button />);

    const btn = screen.queryByTestId("send-button");

    expect(btn).not.toBeNull();
    expect(btn?.textContent).toContain("Send");
    expect(btn?.getAttribute("aria-label")).toBe("Send message");
  });
});
