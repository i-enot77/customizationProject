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
      }, 1000); // Match this with duration of slideOut animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {isVisible && (
        <div
          className={clsx(className)}
          {...rest}
          // className="fixed z-20 inset-0  flex justify-center items-center w-full h-screen rounded mx-auto "
        >
          <div
            className={innerClass}
            // className="bg-[#EEF3F8] rounded-md px-32 py-10 max-w-[1050px] flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
