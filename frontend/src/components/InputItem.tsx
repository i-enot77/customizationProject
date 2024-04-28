import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputItemProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputItem: React.FC<InputItemProps> = (props) => {
  return <input className={clsx(props.className)} {...props} />;
};

export default InputItem;
