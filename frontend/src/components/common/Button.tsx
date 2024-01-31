import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={clsx(props.className)} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
