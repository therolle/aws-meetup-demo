import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RouterProvider } from "@tanstack/react-router";
import { Layout } from "./Layout";
import { SidebarProvider } from "../contexts/SidebarContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { createTestRouter } from "../test-utils/createTestRouter";

// Mock useAuthenticator
vi.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: () => ({
    signOut: vi.fn(),
  }),
}));

function LayoutRoot() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </ThemeProvider>
  );
}

describe("Layout", () => {
  it("renders sidebar navigation", async () => {
    const router = createTestRouter(LayoutRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /main navigation/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders route content via Outlet", async () => {
    const router = createTestRouter(LayoutRoot, "/tasks");
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("tasks page content")).toBeInTheDocument();
    });
  });

  it("renders mobile menu button", async () => {
    const router = createTestRouter(LayoutRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /toggle navigation menu/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders a main content area", async () => {
    const router = createTestRouter(LayoutRoot);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });
});
