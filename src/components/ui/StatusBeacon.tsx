import React from "react";

export function StatusBeacon({
  label = "ONLINE",
  status = "active",
  className = "",
}: {
  label?: string;
  status?: "active" | "idle" | "exploration";
  className?: string;
}) {
  const dotColors = {
    active: "bg-cobalt",
    idle: "bg-ink-meta",
    exploration: "bg-amber-500",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-meta ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {status === "active" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-none ${dotColors[status]}`}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}

export function StatusBadge({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hairline-border bg-surface text-ink-primary font-medium ${className}`}
    >
      {status}
    </span>
  );
}
