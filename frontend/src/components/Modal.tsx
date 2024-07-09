import { ReactNode, HTMLAttributes, useState, useEffect } from "react";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  innerClass: string;
} & HTMLAttributes<HTMLDivElement>;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  innerClass,
  className,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 700); // Match with duration of slideOut animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {isVisible && (
        <div className={clsx(className)} {...rest}>
          <div className={innerClass} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
