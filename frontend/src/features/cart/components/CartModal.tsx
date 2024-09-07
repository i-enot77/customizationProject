import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import CartEmpty from "./CartEmpty";
import { RootState } from "../../../services/store";
import { useAppDispatch } from "../../../services/hooks";
import { setCartSummary, setShowCart } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCartFromLocalStorage } from "@/hooks/useCartFromLocalStorage";

const CartModal = () => {
  const isOpen = useSelector((state: RootState) => state.cart.showCart);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useCartFromLocalStorage();

  const handleClick = () => {
    dispatch(setCartSummary(true));
    dispatch(setShowCart(false));
    navigate("/cart-sum");
  };
  return (
    <Modal
      isOpen={isOpen}
      innerClass={`${
        isOpen ? "animate-slideIn" : "animate-slideOut"
      } bg-white w-[50%] h-full  z-[11] flex flex-col justify-center py-4`}
      onClick={() => dispatch(setShowCart(false))}
      className="fixed z-10 inset-0  w-full h-screen bg-[#bdbdbd8f] flex justify-end items-center"
    >
      <div className="w-full h-full overflow-y-auto">
        <div className="flex justify-between items-center  px-6 mb-5">
          <h2 className="text-2xl font-semibold">Koszyk</h2>
          <Button onClick={() => dispatch(setShowCart(false))}>
            <FontAwesomeIcon icon={faXmark} size="2xl" />
          </Button>
        </div>
        {cart.length ? (
          <div className="flex flex-col">
            <Cart />
            <Button
              className="mt-10 self-center bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
              onClick={() => handleClick()}
            >
              Dalej
            </Button>
          </div>
        ) : (
          <div className="w-full px-6 grow flex flex-col justify-center items-center">
            <CartEmpty />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
