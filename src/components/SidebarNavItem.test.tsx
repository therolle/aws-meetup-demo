import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/react-router";
import { SidebarNavItem } from "./SidebarNavItem";

function createTestRouter(initialPath = "/") {
  const rootRoute = createRootRoute({
    component: () => (
      <SidebarNavItem
        to="/dashboard"
        icon={<svg data-testid="test-icon" />}
        label="Dashboard"
      />
    ),
  });

  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: () => <div>Dashboard</div>,
  });

  const routeTree = rootRoute.addChildren([dashboardRoute]);

  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}

describe("SidebarNavItem", () => {
  it("renders a link with label and icon", async () => {
    const router = createTestRouter();
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders as a link pointing to the correct route", async () => {
    const router = createTestRouter();
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /dashboard/i }),
      ).toBeInTheDocument();
    });

    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });
});
