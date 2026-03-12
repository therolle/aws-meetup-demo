import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RouterProvider } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { createTestRouter } from "../test-utils/createTestRouter";

// Mock useAuthenticator
vi.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: () => ({
    signOut: vi.fn(),
  }),
}));

function SidebarRoot() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    </ThemeProvider>
  );
}

describe("Sidebar", () => {
  it("renders all main navigation items", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("renders all bottom navigation items", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Activity Log")).toBeInTheDocument();
    });
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders the app title", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("AWS Demo")).toBeInTheDocument();
    });
  });

  it("renders sign out button", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign out/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders theme toggle", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /switch to/i }),
      ).toBeInTheDocument();
    });
  });

  it("has navigation landmark", async () => {
    const router = createTestRouter(SidebarRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /main navigation/i }),
      ).toBeInTheDocument();
    });
  });
});
