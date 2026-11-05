import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function DisplayHeading({
  children,
  className = "",
  as: Component = "h1",
}: TypographyProps) {
  return (
    <Component
      className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-normal leading-[1.08] tracking-[-0.035em] text-ink-primary ${className}`}
    >
      {children}
    </Component>
  );
}

export function SectionHeading({
  children,
  className = "",
  as: Component = "h2",
}: TypographyProps) {
  return (
    <Component
      className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.18] tracking-[-0.025em] text-ink-primary ${className}`}
    >
      {children}
    </Component>
  );
}

export function SubHeading({
  children,
  className = "",
  as: Component = "h3",
}: TypographyProps) {
  return (
    <Component
      className={`font-sans text-lg sm:text-xl md:text-2xl font-medium leading-[1.3] tracking-[-0.015em] text-ink-primary ${className}`}
    >
      {children}
    </Component>
  );
}

export function BodyText({
  children,
  className = "",
  as: Component = "p",
  size = "md",
}: TypographyProps & { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-xs sm:text-sm leading-[1.6]",
    md: "text-sm sm:text-base leading-[1.65]",
    lg: "text-base sm:text-lg leading-[1.7]",
  };

  return (
    <Component
      className={`font-sans ${sizeClasses[size]} text-ink-secondary ${className}`}
    >
      {children}
    </Component>
  );
}

export function MonoLabel({
  children,
  className = "",
  as: Component = "span",
  size = "sm",
}: TypographyProps & { size?: "xs" | "sm" | "md" }) {
  const sizeClasses = {
    xs: "text-[9px] sm:text-[10px] tracking-[0.12em]",
    sm: "text-[10px] sm:text-[11px] tracking-[0.08em]",
    md: "text-xs sm:text-sm tracking-[0.04em]",
  };

  return (
    <Component
      className={`font-mono uppercase tabular-figures ${sizeClasses[size]} text-ink-meta ${className}`}
    >
      {children}
    </Component>
  );
}

export function SectionKicker({
  index,
  label,
  className = "",
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${className}`}>
      {index && (
        <span className="font-mono text-xs uppercase text-cobalt font-semibold">
          [{index}]
        </span>
      )}
      <span className="font-mono text-xs uppercase tracking-wider text-ink-meta">
        {label}
      </span>
      <div className="flex-1 h-px bg-hairline" />
    </div>
  );
}
