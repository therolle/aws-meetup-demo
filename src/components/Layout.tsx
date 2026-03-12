import { useRef, useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { MobileMenuButton } from "./MobileMenuButton";
import { useSidebar } from "../contexts/SidebarContext";

export function Layout() {
  const { isOpen } = useSidebar();
  const contentRef = useRef<HTMLDivElement>(null);

  // Set inert on main content when mobile sidebar is open
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.setAttribute("inert", "");
    } else {
      el.removeAttribute("inert");
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      {/* Main content */}
      <div ref={contentRef} className="md:ml-60 min-h-screen flex flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 border-b border-border bg-bg-secondary md:hidden">
          <div className="flex items-center px-4 py-3">
            <MobileMenuButton />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
