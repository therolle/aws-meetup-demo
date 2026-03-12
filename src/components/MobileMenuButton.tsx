import { useSidebar } from "../contexts/SidebarContext";

export function MobileMenuButton() {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:bg-bg-secondary transition-colors"
      aria-label="Toggle navigation menu"
      type="button"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
