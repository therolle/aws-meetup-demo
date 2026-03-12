import {
  createRouter,
  createRootRoute,
  createRoute,
  createMemoryHistory,
} from "@tanstack/react-router";

/**
 * Creates a TanStack Router instance with all app routes stubbed,
 * wrapping the given root component. For use in tests.
 */
export function createTestRouter(
  RootComponent: () => JSX.Element,
  initialPath = "/tasks",
) {
  const rootRoute = createRootRoute({
    component: RootComponent,
  });

  const routes = [
    "/dashboard",
    "/tasks",
    "/projects",
    "/team",
    "/activity",
    "/reports",
    "/settings",
  ].map((path) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => <div>{path.slice(1)} page content</div>,
    }),
  );

  const routeTree = rootRoute.addChildren(routes);

  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}
