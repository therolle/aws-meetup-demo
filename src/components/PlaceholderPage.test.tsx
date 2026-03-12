import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PlaceholderPage } from "./PlaceholderPage";

describe("PlaceholderPage", () => {
  it("renders title and default description", () => {
    render(<PlaceholderPage title="Dashboard" />);

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This feature is coming soon."),
    ).toBeInTheDocument();
  });

  it("renders custom description when provided", () => {
    render(
      <PlaceholderPage title="Reports" description="Analytics coming soon." />,
    );

    expect(
      screen.getByRole("heading", { name: "Reports" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Analytics coming soon.")).toBeInTheDocument();
  });
});
