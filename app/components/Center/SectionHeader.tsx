import type { ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
};

export default function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <>
      <header className="px-4 py-3 sm:py-3.5">
        <h2
          data-section-title="true"
          className="text-base font-semibold leading-tight text-title sm:text-lg font-heading"
        >
          {children}
        </h2>
      </header>
      <div className="double-divider" />
    </>
  );
}
