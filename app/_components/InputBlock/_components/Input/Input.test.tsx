import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "./Input";

function makeRegister(): UseFormRegisterReturn {
  return {
    name: "message",
    onChange: vi.fn() as unknown as UseFormRegisterReturn["onChange"],
    onBlur: vi.fn() as unknown as UseFormRegisterReturn["onBlur"],
    ref: vi.fn() as unknown as UseFormRegisterReturn["ref"],
  } as UseFormRegisterReturn;
}

describe("Input", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders with default placeholder and aria-label", () => {
    const register = makeRegister();
    render(<Input {...register} />);

    const input = screen.queryByTestId("input");
    const placeholder = input?.getAttribute("placeholder") || "";
    const aria = input?.getAttribute("aria-label") || "";

    expect(input).not.toBeNull();
    expect(placeholder).toBe("Message");
    expect(aria).toBe("Input message");
  });

  test("renders expected base classes", () => {
    const register = makeRegister();
    render(<Input {...register} />);

    const input = screen.queryByTestId("input");
    const className = input?.className || "";

    expect(className).toEqual(expect.stringContaining("text-primary"));
    expect(className).toEqual(expect.stringContaining("w-full"));
    expect(className).toEqual(expect.stringContaining("h-12"));
  });
});
