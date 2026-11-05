import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cobalt" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  external = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3 text-sm sm:text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-ink-primary text-canvas hover:bg-cobalt border border-ink-primary hover:border-cobalt",
    secondary:
      "bg-transparent text-ink-primary border border-hairline hover:border-ink-primary hover:bg-surface",
    cobalt:
      "bg-cobalt text-white hover:bg-cobalt-hover border border-cobalt",
    ghost:
      "bg-transparent text-ink-primary hover:text-cobalt border border-transparent p-0 hover:bg-transparent",
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {children}
          {icon}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClass}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
      {icon}
    </button>
  );
}
