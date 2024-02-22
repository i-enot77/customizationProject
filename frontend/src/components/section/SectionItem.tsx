import React, { ReactNode } from "react";
import clsx from "clsx";

interface SectionItemProps {
  className?: string;
  children: ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = (props) => {
  return <section className={clsx(props.className)}>{props.children}</section>;
};

export default SectionItem;
