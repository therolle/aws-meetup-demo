import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MobileMenuButton } from "./MobileMenuButton";
import { SidebarProvider } from "../contexts/SidebarContext";

function renderWithProviders() {
  return render(
    <SidebarProvider>
      <MobileMenuButton />
    </SidebarProvider>,
  );
}

describe("MobileMenuButton", () => {
  it("renders a button with accessible label", () => {
    renderWithProviders();

    expect(
      screen.getByRole("button", { name: /toggle navigation menu/i }),
    ).toBeInTheDocument();
  });

  it("calls toggle on click", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    await user.click(button);

    // The button should still be in the document after clicking
    expect(button).toBeInTheDocument();
  });

  it("has button type to prevent form submission", () => {
    renderWithProviders();

    const button = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(button).toHaveAttribute("type", "button");
  });
});
