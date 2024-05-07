import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import CartEmpty from "./CartEmpty";
import { RootState } from "../../../services/store";
import { useAppDispatch } from "../../../services/hooks";
import {
  setCart,
  setCartSummary,
  setShowCart,
} from "../../../services/cartSlice";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

const CartModal = () => {
  const showCart = useSelector((state: RootState) => state.cart.showCart);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log(savedCart);

    dispatch(setCart(savedCart ? JSON.parse(savedCart) : []));
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleClick = () => {
    dispatch(setCartSummary(true));
    dispatch(setShowCart(false));
    navigate("/cart-sum");
  };
  return (
    <>
      {showCart && (
        <Modal
          innerClass="bg-white w-[50%] h-full flex flex-col justify-center"
          onClick={() => dispatch(setShowCart(false))}
          className="fixed z-100 inset-0  w-full h-screen bg-[#6e6e6eab] flex justify-end items-center "
        >
          {cart.length ? (
            <>
              <Cart />
              <Button
                className="mt-10 self-center bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
                onClick={() => handleClick()}
              >
                Dalej
              </Button>
            </>
          ) : (
            <CartEmpty />
          )}
        </Modal>
      )}
    </>
  );
};

export default CartModal;
