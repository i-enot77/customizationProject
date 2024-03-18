import { useSelector } from "react-redux";
import { useAppDispatch } from "../../services/hooks";
import { RootState } from "../../services/store";
import { setShowCart } from "../../services/cartSlice";
import Cart from "./Cart";
import CartEmpty from "./CartEmpty";

const CartModal = () => {
  const showCart = useSelector((state: RootState) => state.cart.showCart);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useAppDispatch();
  return (
    <>
      {showCart && (
        <div
          onClick={() => dispatch(setShowCart(false))}
          className="fixed z-100 inset-0  w-full h-screen bg-[#adadad6b] flex justify-end items-center "
        >
          <div
            className="bg-[#f3ead2] w-[50%] h-full flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {cart.length ? <Cart /> : <CartEmpty />}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
