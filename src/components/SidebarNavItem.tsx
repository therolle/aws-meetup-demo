import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

interface SidebarNavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

const baseClasses =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const inactiveClasses = `${baseClasses} text-text-secondary hover:bg-bg-primary hover:text-text-primary`;
const activeClasses = `${baseClasses} bg-primary/10 text-primary`;

export function SidebarNavItem({
  to,
  icon,
  label,
  onClick,
}: SidebarNavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={inactiveClasses}
      activeProps={{ className: activeClasses }}
    >
      <span className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Link>
  );
}
