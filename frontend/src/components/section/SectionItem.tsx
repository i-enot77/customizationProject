import React, { ReactNode } from "react";

interface SectionItemProps {
  sectionClass?: string;
  children: ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = ({
  sectionClass,
  children,
}) => {
  return (
    <section className={`flex justify-between flex-wrap ${sectionClass}`}>
      {children}
    </section>
  );
};

export default SectionItem;
