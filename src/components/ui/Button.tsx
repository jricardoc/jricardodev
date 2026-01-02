import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${className}`}>
        {icon && <span className="icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
}
