import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
  gradient = false,
}: CardProps) {
  const hoverClass = hover ? "hover:-translate-y-1" : "";
  const containerClass = gradient ? "gradient-border" : "card";

  return (
    <div className={`${containerClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
