import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../contexts/ThemeContext";

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("renders a toggle button with accessible label", () => {
    renderWithTheme();
    const button = screen.getByRole("button", { name: /switch to/i });
    expect(button).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(
      screen.getByRole("button", { name: /switch to light mode/i })
    ).toBeInTheDocument();
  });

  it("toggles back to light mode on second click", async () => {
    const user = userEvent.setup();
    renderWithTheme();

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    await user.click(button);
    await user.click(
      screen.getByRole("button", { name: /switch to light mode/i })
    );

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it("has correct button type to prevent form submission", () => {
    renderWithTheme();
    const button = screen.getByRole("button", { name: /switch to/i });
    expect(button).toHaveAttribute("type", "button");
  });
});
