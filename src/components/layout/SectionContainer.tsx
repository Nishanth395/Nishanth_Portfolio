import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  hairlineTop?: boolean;
  hairlineBottom?: boolean;
  noPaddingY?: boolean;
}

export function SectionContainer({
  children,
  id,
  className = "",
  hairlineTop = false,
  hairlineBottom = false,
  noPaddingY = false,
}: SectionContainerProps) {
  const borderClasses = `
    ${hairlineTop ? "hairline-t" : ""}
    ${hairlineBottom ? "hairline-b" : ""}
  `;

  return (
    <section
      id={id}
      className={`w-full ${borderClasses} ${
        noPaddingY ? "" : "py-12 sm:py-16 md:py-20 lg:py-24"
      } ${className}`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

export function Grid12({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 ${className}`}
    >
      {children}
    </div>
  );
}
