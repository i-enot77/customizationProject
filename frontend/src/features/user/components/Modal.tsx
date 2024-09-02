import { ReactNode, HTMLAttributes } from "react";

type ModalProps = {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
  //   innerClass: string;
} & HTMLAttributes<HTMLDivElement>;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClick,
  children,
  //   innerClass,
  //   className,
  ...rest
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 inset-0  w-full h-screen bg-[#bdbdbd8f] flex justify-center items-center"
          {...rest}
          onClick={onClick}
        >
          <div
            className="bg-white p-10 rounded w-1/2"
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
